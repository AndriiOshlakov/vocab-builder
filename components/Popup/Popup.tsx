'use client';

import { useAuthStore } from '@/lib/store/authStore';
import Navigation from '../Navigation/Navigation';
import css from './Popup.module.css';
import Image from 'next/image';

interface Props {
  onClose: () => void;
}

export default function Popup({ onClose }: Props) {
  const user = useAuthStore((state) => state.user);
  return (
    <div className={css.overlay} onClick={onClose}>
      <div className={css.modal}>
        <button onClick={onClose} className={css.closeBtn}>
          <svg width={32} height={32} className={css.x}>
            <use href="/symbol-defs.svg#x" />
          </svg>
        </button>
        <div className={css.userBox}>
          <p className={css.text}>{user?.name}</p>
          <div className={css.box}>
            <svg width={20} height={20} className={css.icon}>
              <use href="/symbol-defs.svg#user" />
            </svg>
          </div>
        </div>
        <Navigation />
        <Image
          src="/popUpMob.png"
          width={185}
          height={318}
          alt="Reading book"
          className={css.mobImg}
        />
        <Image
          src="/popUpTab.png"
          width={300}
          height={435}
          alt="Reading book"
          className={css.tabImg}
        />
      </div>
    </div>
  );
}
