'use client';

import { getStatistics } from '@/lib/api/clientApi';
import css from './Statistics.module.css';
import { useQuery } from '@tanstack/react-query';

export default function Statistics() {
  const { data } = useQuery({
    queryKey: ['statistics'],
    queryFn: () => getStatistics(),
  });

  return (
    <>
      <p className={css.text}>
        To study:<span>{data?.totalCount}</span>
      </p>
    </>
  );
}
