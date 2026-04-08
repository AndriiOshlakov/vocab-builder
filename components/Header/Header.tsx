'use client';

import { useAuthStore } from '@/lib/store/authStore';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import css from './Header.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/clientApi';
import toast from 'react-hot-toast';
import Popup from '../Popup/Popup';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    toast.success('Logged successfull!');
    router.push('/login');
  };
  return (
    <div className={css.header}>
      <Logo />
      <div className={css.navBox}>
        <Navigation />
      </div>
      <div className={css.mobMenu}>
        <p className={css.text}>{user?.name}</p>
        <div className={css.box}>
          <svg width={20} height={20} className={css.icon}>
            <use href="/symbol-defs.svg#user" />
          </svg>
        </div>
        <button className={css.btn} onClick={() => setIsModalOpen(!isModalOpen)}>
          <svg className={css.burger} width={32} height={22}>
            <use href="/symbol-defs.svg#burger" />
          </svg>
        </button>
        <button className={css.logout} onClick={handleLogout}>
          Log out →
        </button>
      </div>
      {isModalOpen && <Popup onClose={() => setIsModalOpen(!isModalOpen)} />}
    </div>
  );
}
