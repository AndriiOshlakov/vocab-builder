'use client';

import Link from 'next/link';
import css from './Navigation.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';

export default function Navigation() {
  const path = usePathname();
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    toast.success('Logged successfull!');
    router.push('/login');
  };
  return (
    <div className={css.nav}>
      <Link href="/dictionary" className={path === '/dictionary' ? css.active : css.link}>
        Dictionary
      </Link>
      <Link href="/recommend" className={path === '/recommend' ? css.active : css.link}>
        Recommend
      </Link>
      <Link href="/training" className={path === '/training' ? css.active : css.link}>
        Training
      </Link>
      <button className={css.logout} onClick={handleLogout}>
        Log out →
      </button>
    </div>
  );
}
