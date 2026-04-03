'use client';

import { useAuthStore } from '@/lib/store/authStore';
import { getMeServer } from '@/lib/api/serverApi';

import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getMeServer();
      if (user) {
        setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
