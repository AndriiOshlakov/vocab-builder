'use client';

import Link from 'next/link';
import css from './AddWordBlock.module.css';
import { useState } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import AddWordModal from '../AddWordModal/AddWordModal';
import { usePathname } from 'next/navigation';

export default function AddWordBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathName = usePathname();
  return (
    <div className={css.container}>
      {pathName === '/dictionary' && (
        <button className={css.btn} onClick={() => setIsModalOpen(true)}>
          Add word
          <svg width={20} height={20} className={css.icon}>
            <use href="/symbol-defs.svg#plus" />
          </svg>
        </button>
      )}
      <Link href="/training" className={css.link}>
        Train oneself
        <svg width={20} height={20} className={css.icon}>
          <use href="/symbol-defs.svg#arrow" />
        </svg>
      </Link>
      {isModalOpen && (
        <Backdrop onClose={() => setIsModalOpen(false)}>
          <AddWordModal onModalClose={() => setIsModalOpen(false)} />
        </Backdrop>
      )}
    </div>
  );
}
