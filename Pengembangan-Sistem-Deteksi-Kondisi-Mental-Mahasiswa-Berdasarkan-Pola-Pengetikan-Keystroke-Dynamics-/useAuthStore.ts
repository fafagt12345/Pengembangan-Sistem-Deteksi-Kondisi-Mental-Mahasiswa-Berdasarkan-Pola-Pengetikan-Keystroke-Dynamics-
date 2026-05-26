import { create } from 'zustand';
import { User } from 'firebase/auth';

interface AuthState {
  user: User | null;
  role: 'mahasiswa' | 'admin' | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: 'mahasiswa' | 'admin' | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setRole: (role) => set({ role }),
}));