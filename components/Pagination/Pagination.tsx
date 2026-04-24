'use client';

import css from './Pagination.module.css';

interface Props {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, pageCount, onPageChange }: Props) {
  const isFirstPage = page === 1;
  const isLastPage = page === pageCount;
  const isAfterFirstPage = page === 2;

  return (
    <div className={css.wrapper}>
      <div className={css.box}>
        <button className={css.btn} disabled={isFirstPage} onClick={() => onPageChange(1)}>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-left" />
          </svg>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-left" />
          </svg>
        </button>
        <button className={css.btn} disabled={isFirstPage} onClick={() => onPageChange(page - 1)}>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-left" />
          </svg>
        </button>
      </div>
      <div className={css.pagination}>
        {!isFirstPage && !isAfterFirstPage && (
          <button onClick={() => onPageChange(page - 2)} className={css.pageTwo}>
            {page - 2}
          </button>
        )}
        {!isFirstPage && (
          <button onClick={() => onPageChange(page - 1)} className={css.pageTab}>
            {page - 1}
          </button>
        )}
        {!isFirstPage && (
          <button onClick={() => onPageChange(page - 1)} className={css.pageMob}>
            {page - 1}
          </button>
        )}
        <button onClick={() => onPageChange(page)} className={`${css.page} ${css.active}`}>
          {page}
        </button>
        {isFirstPage && pageCount > 1 && (
          <button onClick={() => onPageChange(page + 1)} className={css.pageMob}>
            {page + 1}
          </button>
        )}
        {(isFirstPage || isAfterFirstPage) && pageCount >= 2 && !isLastPage && (
          <button onClick={() => onPageChange(page + 1)} className={css.pageTab}>
            {page + 1}
          </button>
        )}
        {isFirstPage && pageCount >= 3 && (
          <button onClick={() => onPageChange(page + 2)} className={css.pageTwo}>
            {page + 2}
          </button>
        )}
        {!isLastPage && pageCount > 3 && <p className={css.dots}>...</p>}
        {!isLastPage && pageCount > 3 && (
          <button className={css.page} onClick={() => onPageChange(pageCount)}>
            {pageCount}
          </button>
        )}
      </div>
      <div className={css.box}>
        <button className={css.btn} disabled={isLastPage} onClick={() => onPageChange(page + 1)}>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-right" />
          </svg>
        </button>
        <button className={css.btn} disabled={isLastPage} onClick={() => onPageChange(pageCount)}>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-right" />
          </svg>
          <svg width={6} height={12}>
            <use href="/symbol-defs.svg#chevron-right" />
          </svg>
        </button>
      </div>
    </div>
  );
}
