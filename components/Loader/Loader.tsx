import { PacmanLoader } from 'react-spinners';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.backdrop}>
      <PacmanLoader color="#685ac5" />
    </div>
  );
}
