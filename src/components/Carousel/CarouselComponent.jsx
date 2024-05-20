import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';

import ItemCarousel from './ItemCarousel/ItemCarousel';
import arrow from './arrow.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './Carousel.module.scss';

const CarouselComponent = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  let settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 6000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setActiveIndex(index),
  };

  const slider = useRef(null);
  const handleClick = (index) => {
    slider?.current?.slickGoTo(index);
    setActiveIndex(index);
  };

  const sliderNav = [
    t('carousel.rentals'),
    t('carousel.movies_shows'),
    t('carousel.live_tv'),
    t('carousel.discover'),
    t('carousel.your_media'),
    t('carousel.your_music'),
  ];

  const slidesData = [
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
    {
      title: t('carousel.title'),
      subTitle: t('carousel.subTitle'),
      buttonLabel: t('carousel.buttonLabel'),
    },
  ];
  return (
    <div className={styles.main}>
      <div>
        <nav className={styles.nav}>
          <div className={styles.navList}>
            {sliderNav.map((item, index) => {
              return (
                <div
                  onClick={() => handleClick(index)}
                  key={index}
                  className={`${styles.navItem} ${activeIndex === index ? styles.activeItem : ''}`}
                >
                  {item}
                </div>
              );
            })}
          </div>
          <div className={styles.buttons}>
            <button onClick={() => slider?.current?.slickPrev()} className={styles.arrow}>
              <img src={arrow} alt="arrow" />
            </button>
            <button onClick={() => slider?.current?.slickNext()} className={styles.arrow}>
              <img style={{ transform: `rotate(180deg)` }} src={arrow} alt="arrow" />
            </button>
          </div>
        </nav>
        <Slider style={{}} arrows={false} ref={slider} {...settings}>
          {slidesData.map((slide, index) => (
            <ItemCarousel key={index} slideData={slide} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default CarouselComponent;
