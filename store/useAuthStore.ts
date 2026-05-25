import { create } from "zustand";
import type { User } from "firebase/auth";

type AuthState = {
  user: User | null;
  role: string | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: string | null) => void;
  setLoading: (loading: boolean) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
}));