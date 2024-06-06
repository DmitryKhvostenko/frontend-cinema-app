import { useEffect, useState } from 'react';

import styles from './StarRating.module.scss';

const StarRating = ({ movie, grade, setGrade }) => {
  const [hoverIndex, setHoverIndex] = useState(movie.ratingValue == '' ? 0 : movie.ratingValue);
  useEffect(() => {
    setHoverIndex(movie.ratingValue == '' ? 0 : movie.ratingValue);
    setGrade(movie.ratingValue == '' ? 0 : movie.ratingValue);
  }, [movie]);

  const ratingArray = Array.from({ length: 10 });

  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleMouseOver = (index) => {
    setHoverIndex(index);
  };

  const handleMouseOut = () => {
    setHoverIndex(-1);
  };

  return (
    <div onMouseOver={() => setIsMouseOver(true)} className={styles.filmStarRating}>
      {!isMouseOver ? (
        ratingArray.map((star, index) => {
          return (
            <img
              key={index}
              src={
                index + 1 <= grade
                  ? './../images/AppRating/full-rating.svg'
                  : index + 0.1 <= grade && index + 0.9 >= grade
                    ? './../images/AppRating/half-rating.svg'
                    : './../images/AppRating/no-rating.svg'
              }
              alt={
                index + 1 <= grade
                  ? 'full-star'
                  : index + 0.1 <= grade && index + 0.9 >= grade
                    ? 'half-star'
                    : 'no-star'
              }
            />
          );
        })
      ) : (
        <div
          onMouseOut={() => {
            setIsMouseOver(false);
            handleMouseOut();
          }}
          className={styles.filmStarRating}
        >
          {ratingArray.map((star, index) => (
            <img
              onClick={() => {
                setGrade(index + 1);
              }}
              onMouseOver={() => {
                handleMouseOver(index);
              }}
              key={index}
              src={
                index <= hoverIndex ? './../images/AppRating/full-rating.svg' : './../images/AppRating/no-rating.svg'
              }
              alt={index <= hoverIndex ? 'full-star' : 'no-star'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;
