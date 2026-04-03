import { create } from 'zustand';
import { User } from '@/types/user';
import { persist } from 'zustand/middleware';
import { AuthResponse } from '@/types/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: AuthResponse) => void;
  clearIsAuthenticated: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (data) => {
        const { token, ...user } = data;

        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      clearIsAuthenticated: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
