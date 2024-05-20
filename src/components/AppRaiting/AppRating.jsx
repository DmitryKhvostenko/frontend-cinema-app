import { useTranslation } from 'react-i18next';

import styles from './AppRating.module.scss';
const AppRating = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.main}>
      <div className={styles.item}>
        <div className={styles.itemTitle}>
          <img src="./images/AppRating/android-icon.svg" alt="android icon" />
          Play Store
        </div>
        <div className={styles.itemStars}>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/half-rating.svg" alt="half star" />
          </div>
        </div>
        <div className={styles.itemRating}>
          4.4/5 <br /> <span>329,603 {t('rating.ratings')}</span>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>
          <img src="./images/AppRating/ios-icon.svg" alt="android icon" />
          App Store
        </div>
        <div className={styles.itemStars}>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/half-rating.svg" alt="half star" />
          </div>
        </div>
        <div className={styles.itemRating}>
          4.7/5 <br /> <span> 105,183 {t('rating.ratings')}</span>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.itemTitle}>
          <img src="./images/AppRating/rocu-icon.svg" alt="rocu icon" />
          Play Store
        </div>
        <div className={styles.itemStars}>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/full-rating.svg" alt="full star" />
          </div>
          <div className={styles.ratingStar}>
            <img src="./images/AppRating/no-rating.svg" alt="half star" />
          </div>
        </div>
        <div className={styles.itemRating}>
          4/5 <br /> <span>143,174 {t('rating.ratings')}</span>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.downloadTitle}>{t('rating.download')}</div>
        <a href="/#" className={styles.downloadButton}>
          <img src="./images/AppRating/badge-google-play.png" alt="download button" />
        </a>
        <a href="/#" className={styles.downloadButton}>
          <img src="./images/AppRating/badge-app-store.png" alt="download button" />
        </a>
      </div>
    </div>
  );
};

export default AppRating;
