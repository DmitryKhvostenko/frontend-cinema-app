import {Link} from 'react-router-dom';
import styles from './Error.module.scss'

const Error = ({t}) => {
  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('error.button')}</h1>
        <div className={styles.text}>
          {t('error.text')}.
        </div>
        <Link className={styles.button} to='/'>{t('error.button')}</Link>
      </div>
    </div>
  );
};

export default Error;
