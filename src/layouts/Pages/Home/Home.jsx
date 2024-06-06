import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppRating from 'components/AppRaiting/AppRating';
import CarouselComponent from 'components/Carousel/CarouselComponent';

import axios from '../../../axios';

import styles from './Home.module.scss';

const Home = ({ t }) => {
  useEffect(() => {
    axios.get('/comments');
  }, []);
  return (
    <main className={styles.main}>
      <div className={styles.greeting}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t('home.title')}!</h1>
          <div className={styles.text}>{t('home.text')}.</div>
          <Link to="/catalog" className={styles.button}>
            {t('home.button')}
          </Link>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.slider}>
          <CarouselComponent />
        </div>

        <AppRating />
      </div>
    </main>
  );
};

export default Home;
