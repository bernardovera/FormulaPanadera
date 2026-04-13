import { create } from 'zustand';

type User = {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  isGuest: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setGuest: (guest: boolean) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  isGuest: false,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  setGuest: (guest) => set({ isGuest: guest }),
}));