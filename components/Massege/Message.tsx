'use client';

import Image from 'next/image';
import css from './Message.module.css';
import { useRouter } from 'next/navigation';

export default function Message() {
  const router = useRouter();
  return (
    <div className={css.message}>
      <Image
        width={144}
        height={166}
        alt="Exercise book"
        src="/blood-report.png"
        className={css.img}
      />
      <Image
        width={203}
        height={230}
        alt="Exercise book"
        src="/blood-report-tab.png"
        className={css.imgTab}
      />
      <div className={css.container}>
        <p className={css.text}>You don&apos;t have a single word to learn right now. </p>
        <p className={css.subText}>
          Please create or add a word to start the workout. We want to improve your vocabulary and
          develop your knowledge, so please share the words you are interested in adding to your
          study.
        </p>
        <div className={css.btnsBox}>
          <button className={css.saveBtn} onClick={() => router.push('/dictionary?modal=add')}>
            Add word
          </button>
          <button className={css.cancelBtn} onClick={() => router.push('/dictionary')}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
