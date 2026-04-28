import { Answer } from '@/types/words';
import css from './WellDoneModal.module.css';
import Image from 'next/image';

type Props = {
  onClose: () => void;
  answers: Answer[];
};

export default function WellDoneModal({ onClose, answers }: Props) {
  const correctAnswers = answers.filter((item) => item.isDone);
  const incorrectAnswers = answers.filter((item) => !item.isDone);
  return (
    <div className={css.modal}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        <svg width={28} height={28} className={css.icon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>

      {answers.length === 0 && (
        <p className={css.emptyAnswer}>Your answers are empty. Try again.</p>
      )}
      {(correctAnswers.length !== 0 || incorrectAnswers.length !== 0) && (
        <h1 className={css.title}>Well done</h1>
      )}
      {(correctAnswers.length !== 0 || incorrectAnswers.length !== 0) && (
        <div className={css.container}>
          <div className={css.box}>
            <p className={css.text}>Сorrect answers: </p>
            <ul className={css.list}>
              {correctAnswers.map((item) => (
                <li key={item._id} className={css.word}>
                  {item.en}
                </li>
              ))}
            </ul>
          </div>
          <div className={css.wrapper}>
            <p className={css.text}>Mistakes: </p>
            <ul className={css.list}>
              {incorrectAnswers.map((item) => (
                <li key={item._id} className={css.word}>
                  {item.en}
                </li>
              ))}
            </ul>
            <Image alt="Book" src="/bookMob.png" width={152} height={121} className={css.imgMob} />
            <Image alt="Book" src="/bookTab.png" width={212} height={179} className={css.imgTab} />
          </div>
        </div>
      )}
    </div>
  );
}
