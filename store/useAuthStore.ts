'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase'; // Pastikan firebase.ts mengekspor auth dan db

interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  prodi?: string;
  semester?: string;
  role?: string | null;
  createdAt?: any; // Tipe serverTimestamp
  updatedAt?: any; // Tipe serverTimestamp
}

interface AuthState {
  user: UserProfile | null;
  loading: boolean;
  authInitialized: boolean; // Untuk melacak apakah status auth Firebase sudah diperiksa
  setUser: (user: UserProfile | null) => void;
  setRole: (role: string | null) => void;
  setAuthInitialized: (initialized: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true,
      authInitialized: false,
      setUser: (user) => set({ user }),
      setRole: (role) => set((state) => ({
        user: state.user ? { ...state.user, role } : null
      })),
      setAuthInitialized: (initialized) => set({ authInitialized: initialized }),
    }),
    {
      name: 'auth-storage', // Nama item di localStorage
      storage: createJSONStorage(() => localStorage),
      // Hanya persist data user, bukan authInitialized
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => (state) => {
        // Ini akan dijalankan saat store direhidrasi dari localStorage
        onAuthStateChanged(auth, async (firebaseUser) => {
          try {
            if (firebaseUser) {
              const userDocRef = doc(db, "users", firebaseUser.uid);
              const userDoc = await getDoc(userDocRef);
              
              if (userDoc.exists()) {
                const userData = userDoc.data() as UserProfile;
                useAuthStore.getState().setUser({
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName || userData.displayName,
                  photoURL: firebaseUser.photoURL || userData.photoURL,
                  prodi: userData.prodi,
                  semester: userData.semester,
                  role: userData.role,
                  createdAt: userData.createdAt,
                  updatedAt: userData.updatedAt,
                });
              } else {
                // Fallback jika data Firestore belum ada
                useAuthStore.getState().setUser({
                  uid: firebaseUser.uid,
                  email: firebaseUser.email,
                  displayName: firebaseUser.displayName,
                  photoURL: firebaseUser.photoURL,
                  role: "mahasiswa",
                });
              }
            } else {
              useAuthStore.getState().setUser(null);
            }
          } catch (error) {
            console.error("Auth Listener Error:", error);
          } finally {
            useAuthStore.setState({ loading: false });
            useAuthStore.getState().setAuthInitialized(true);
          }
        });
      },
    }
  )
);