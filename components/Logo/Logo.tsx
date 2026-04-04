import Image from 'next/image';
import css from './Logo.module.css';

export default function Logo() {
  return (
    <div className={css.logoWrapper}>
      <Image src="/Craftwork.png" alt="Logo" width={36} height={36} className={css.logo} />
      <p className={css.text}>VocabBuilder</p>
    </div>
  );
}
