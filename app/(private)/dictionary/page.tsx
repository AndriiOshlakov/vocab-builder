'use client';

import { useState } from 'react';
import css from './Dictionary.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllWords } from '@/lib/api/clientApi';
import { Category } from '@/types/words';
import Table from '@/components/Table/Table';
import Pagination from '@/components/Pagination/Pagination';
import Header from '@/components/Header/Header';
import Filters from '@/components/Filters/Filters';

export default function DictionaryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [currentCategory, setCurrentCategory] = useState('');
  const [currentIsIrregular, setCurrentIsIrregular] = useState(false);
  const currentLimit = 7;

  const { data } = useQuery({
    queryKey: ['words', currentCategory, currentIsIrregular, currentLimit, currentPage, search],
    queryFn: () =>
      getAllWords({
        page: currentPage,
        limit: currentLimit,
        keyword: search,
        isIrregular: currentIsIrregular,
        category: currentCategory as Category,
      }),
  });

  return (
    <div className={css.dictionaryPage}>
      <Header />
      <div className={css.filtersBox}>
        <Filters
          onCtegoryChange={setCurrentCategory}
          onSearch={setSearch}
          onVerb={setCurrentIsIrregular}
        />
      </div>
      {data && <Table words={data.results} />}
      {data && data.results.length > 0 && (
        <Pagination page={currentPage} pageCount={data.totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  );
}
