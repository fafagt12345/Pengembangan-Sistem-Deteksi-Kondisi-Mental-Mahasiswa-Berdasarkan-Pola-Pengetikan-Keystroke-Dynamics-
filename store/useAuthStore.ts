'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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
      getStorage: () => localStorage,
      // Hanya persist data user, bukan authInitialized
      partialize: (state) => ({ user: state.user }),
      onRehydrateStorage: () => {
        // Ini akan dijalankan saat store direhidrasi dari localStorage
        // Kita bisa mengatur listener Firebase di sini
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
          if (firebaseUser) {
            useAuthStore.getState().setUser(null); // Reset sementara
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
              // Fallback jika data Firestore tidak ditemukan (seharusnya tidak terjadi jika registrasi benar)
              useAuthStore.getState().setUser({
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                role: "mahasiswa", // Peran default
              });
            }
          } else {
            useAuthStore.getState().setUser(null);
          }
          useAuthStore.setState({ loading: false });
          useAuthStore.getState().setAuthInitialized(true);
        });

        // Mengembalikan fungsi untuk unsubscribe saat store dibersihkan atau komponen unmount
        return () => unsubscribe();
      },
    }
  )
);