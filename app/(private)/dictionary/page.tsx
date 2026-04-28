'use client';

export const dynamic = 'force-dynamic';

import { useState } from 'react';
import css from './Dictionary.module.css';
import { useQuery } from '@tanstack/react-query';
import { getOwnWords } from '@/lib/api/clientApi';
import { Category } from '@/types/words';
import Table from '@/components/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import Header from '@/components/Header/Header';
import Filters from '@/components/Filters/Filters';
import Statistics from '@/components/Statistics/Statistics';
import AddWordBlock from '@/components/AddWordBlock/AddWordBlock';
import { useRouter, useSearchParams } from 'next/navigation';
import Backdrop from '@/components/Backdrop/Backdrop';
import AddWordModal from '@/components/AddWordModal/AddWordModal';

export default function DictionaryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentIsIrregular, setCurrentIsIrregular] = useState(false);
  const currentLimit = 7;

  const searchParams = useSearchParams();
  const router = useRouter();
  const isAddModalOpen = searchParams.get('modal') === 'add';

  const { data } = useQuery({
    queryKey: ['ownWords', currentCategory, currentIsIrregular, currentLimit, currentPage, search],
    queryFn: () =>
      getOwnWords({
        page: currentPage,
        limit: currentLimit,
        keyword: search,
        isIrregular: currentIsIrregular,
        category: currentCategory as Category,
      }),
  });

  const handleCloseModal = () => {
    router.push('/dictionary');
  };

  return (
    <div className={css.dictionaryPage}>
      <Header />
      <div className={css.filtersBox}>
        <Filters
          onCtegoryChange={setCurrentCategory}
          onSearch={setSearch}
          onVerb={setCurrentIsIrregular}
          onPage={setCurrentPage}
        />
        <div className={css.wrapper}>
          <Statistics />
          <AddWordBlock />
        </div>
      </div>
      {data && <Table words={data.results} />}
      {data && data.results.length > 0 && (
        <Pagination page={currentPage} pageCount={data.totalPages} onPageChange={setCurrentPage} />
      )}
      {isAddModalOpen && (
        <Backdrop onClose={handleCloseModal}>
          <AddWordModal onModalClose={handleCloseModal} />
        </Backdrop>
      )}
    </div>
  );
}
