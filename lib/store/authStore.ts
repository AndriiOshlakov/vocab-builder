import { create } from 'zustand';
import { User } from '@/types/user';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '@/types/auth';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: AuthResponse) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (data: User) => {
        set({
          user: data,
          isAuthenticated: true,
        });
      },
      clearIsAuthenticated: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
