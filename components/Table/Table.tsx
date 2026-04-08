import { Word } from '@/types/words';
import css from './Table.module.css';
import Image from 'next/image';

interface TableProps {
  words: Word[];
}

export default function Table({ words }: TableProps) {
  return (
    <div className={css.tableWrapper}>
      <div className={css.table}>
        <div className={css.tableBox}>
          <div className={`${css.tableHeadRow} ${css.word}`}>
            <p>Word</p>
            <Image alt="Flag" width={32} height={32} src="/en.png" className={css.flag} />
          </div>
          <div className={`${css.tableHeadRow} ${css.translation}`}>
            <p>Translation</p>
            <Image alt="Flag" width={32} height={32} src="/uk.png" className={css.flag} />
          </div>
          <div className={`${css.tableHeadRow} ${css.category}`}>Category</div>
          <div className={`${css.tableHeadRow} ${css.progress}`}>Progress</div>
          <div className={`${css.tableHeadRow} ${css.edit}`}></div>
        </div>
        {words &&
          words.map((word) => (
            <div key={word._id} className={css.wordBox}>
              <div className={`${css.wordRow} ${css.wordWord}`}>{word.en}</div>
              <div className={`${css.wordRow} ${css.wordTranslation}`}>{word.ua}</div>
              <div className={`${css.wordRow} ${css.wordCategory}`}>{word.category}</div>
              <div className={`${css.wordRow} ${css.wordProgress}`}></div>
              <div className={`${css.wordRow} ${css.wordEdit}`}>...</div>
            </div>
          ))}
      </div>
    </div>
  );
}
