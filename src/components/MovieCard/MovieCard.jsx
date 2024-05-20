import { NavLink } from 'react-router-dom';

import handleError from 'utils/ImagePlaceholder';

import styles from './MovieCard.module.scss';

const MovieCard = (props) => {
  return (
    <NavLink to={`/movie/${props.id}`} className={styles.link}>
      <li className={styles.item}>
        <img src={props.poster_url} onError={handleError} alt="poster" />
        <div>
          {props.name}
          <div className={styles.description}>
            <div className={styles.descriptionInfo}>
              <div>
                {props.year.replace(/\D/g, '')}{' '}
                {props.ratingValue && (
                  <>
                    | {props.ratingValue}
                    <img src="./images/AppRating/full-rating.svg" alt="full star" />
                  </>
                )}
              </div>
            </div>
            <div>{props.genre.join(',')}</div>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default MovieCard;
