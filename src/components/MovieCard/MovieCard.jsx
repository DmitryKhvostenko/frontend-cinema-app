import { NavLink } from 'react-router-dom';
import i18n from '18n';
import GenreMap from 'utils/GenreMap';
import handleError from 'utils/ImagePlaceholder';

import styles from './MovieCard.module.scss';

const MovieCard = (props) => {
  const validLanguages = ['en', 'ua'];
  const language = validLanguages.includes(i18n.language) ? i18n.language : 'en';
  const MovieGenres = () => <span>{props.genre.map((genre) => GenreMap[language][genre.trim()]).join(', ')}</span>;

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
            <div>{<MovieGenres />}</div>
          </div>
        </div>
      </li>
    </NavLink>
  );
};

export default MovieCard;
