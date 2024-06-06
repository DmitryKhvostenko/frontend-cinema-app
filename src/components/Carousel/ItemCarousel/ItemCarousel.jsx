import { Link } from 'react-router-dom';

import image01 from './image01.png';

import styles from './ItemCarousel.module.scss';

const ItemCarousel = ({ slideData }) => {
  return (
    <div className={styles.sliderItem}>
      <div>
        <div className={styles.sliderItemContent}>
          <div className={styles.sliderItemTitle}>{slideData.title}</div>
          <div className={styles.sliderItemSubTitle}>{slideData.subTitle}</div>
          <button className={styles.sliderItemButton}>
            <Link to="/placeholder">{slideData.buttonLabel}</Link>
          </button>
        </div>
        <div className={styles.sliderItemImage}>
          <img src={image01} alt="image" />
        </div>
      </div>
    </div>
  );
};

export default ItemCarousel;
