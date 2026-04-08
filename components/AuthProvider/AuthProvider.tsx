'use client';

import { useAuthStore } from '@/lib/store/authStore';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getMe } from '@/lib/api/clientApi';

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getMe();

        if (user && user._id) {
          setUser(user);
          router.push('/dictionary');
        } else {
          router.push('/register');
        }
      } catch (error) {
        console.log('Unauthorized:', error);

        clearIsAuthenticated(); // 👈 бажано
        router.push('/register');
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated, router]);

  return children;
};

export default AuthProvider;
