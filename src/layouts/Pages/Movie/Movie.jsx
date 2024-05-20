import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { Link, useNavigate, useParams } from 'react-router-dom';

import GenreMap from 'utils/GenreMap';
import sortFilms from 'utils/SortedCatalog';
import Comments from 'components/Comments/Comments';
import StarRating from 'components/StarRating/StarRating';

import movies from 'backend/Movies.json';

import styles from './Movie.module.scss';

const Movie = ({ t }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(movies.find((movie) => movie.ImdbId === id));
  const [alsoMovies, setAlsoMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [grade, setGrade] = useState();

  const { i18n } = useTranslation();
  const validLanguages = ['en', 'ua'];
  const language = validLanguages.includes(i18n.language) ? i18n.language : 'en';
  const navigate = useNavigate();

  useEffect(() => {
    setGrade(movie?.ratingValue == null ? 0 : movie.ratingValue);
    !movie && navigate('/error');
  }, []);

  useEffect(() => {
    localStorage.setItem('lastFilm', id);
  }, [id]);

  useEffect(() => {
    setAlsoMovies(sortFilms('bestRating', [...movies]).slice(0, 5));
    setPopularMovies(sortFilms('mostPopular', [...movies]).slice(0, 3));
  }, []);

  useEffect(() => {
    setMovie(movies.find((movie) => movie.ImdbId === id));
  }, [id]);

  const [playerStart, setPlayerStart] = useState(false);

  const formatTime = (minutes) => {
    console.log(i18n.language);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return i18n.language === 'ua' ? `${hours}год ${remainingMinutes}хв` : `${hours}h ${remainingMinutes}min`;
  };

  const MovieGenres = () => <span>{movie.genre.map((genre) => GenreMap[language][genre.trim()]).join(', ')}</span>;

  return (
    <div className={styles.movie}>
      {movie ? (
        <div className={styles.wrapper}>
          <div className={styles.header}>
            <div className={styles.image}>
              <img src={movie.poster_url} alt="image" />
            </div>
            <div className={styles.description}>
              <div className={styles.name}>{movie.name}</div>
              <div className={styles.descriptionInfo}>
                <div>
                  {t('movie.release date')}: <span>{movie.year.replace(/\D/g, '')}</span>
                </div>
                <div>
                  {t('movie.runtime')}: <span>{formatTime(movie.runtime)}</span>
                </div>
                <div>
                  {t('movie.genres')}: <span>{<MovieGenres />}</span>
                </div>
                <div className={styles.ratingTitle}>{t('movie.rating')}:</div>
                <div className={styles.ratingList}>
                  <div className={styles.ratingItem}>
                    <div className={styles.ratingCount}>
                      <img src="/images/icons/IMDB.svg" alt="IMDB" />
                      <div>{movie.ratingValue == '' ? 0 : movie.ratingValue}</div>
                    </div>
                    <div className={styles.ratingPlatform}>IMDB</div>
                  </div>
                </div>
              </div>
              <a href="#movie" className={styles.trailer}>
                {t('movie.watch trailer')}
              </a>
            </div>
          </div>
          <div className={styles.main}>
            <div className={styles.sider}>
              <div className={styles.cast}>
                <div className={styles.castGroup}>
                  <div className={styles.castTitle}>{t('movie.director')}:</div>
                  <div className={styles.castText}>{movie.director.name}</div>
                </div>
                <div className={styles.castGroup}>
                  <div className={styles.castTitle}>{t('movie.actors')}:</div>
                  <div className={styles.castText}>
                    {movie.cast.map((item) => {
                      return item.name + ', ';
                    })}
                  </div>
                </div>
              </div>
              <div className={styles.popular}>
                <div className={styles.popularTitle}>{t('movie.popular')}</div>
                <div className={styles.popularItems}>
                  {useMemo(
                    () =>
                      popularMovies.map((item) => (
                        <Link key={item.ImdbId} to={`/movie/${item.ImdbId}`}>
                          <div className={styles.popularItem}>
                            <img src={item.poster_url} alt="poster" />
                            <div className={styles.popularItemInfo}>
                              <div className={styles.popularItemTitle}>{item.name}</div>
                              <div className={styles.popularItemSub}>{item.year.replace(/\D/g, '')}</div>
                            </div>
                          </div>
                        </Link>
                      )),
                    [popularMovies]
                  )}
                </div>
              </div>
            </div>
            <div className={styles.film}>
              <h1 className={styles.filmTitle}>
                {t('movie.the film')} {movie.name}
              </h1>
              <div className={styles.filmDescription}>{movie.summary_text}</div>
              <h1 className={styles.watchFree}>
                {t('movie.watch online movie')} {movie.name} {movie.year.replace(/\D/g, '')} {t('movie.for free')}
              </h1>
              <button onClick={() => setPlayerStart(true)} id="movie" className={styles.filmButton}>
                {t('movie.watch online')}
              </button>
              <div className={styles.filmPlayer}>
                {!playerStart && (
                  <div className={styles.filmPlayerPrev}>
                    <img onClick={() => setPlayerStart(true)} src="/images/icons/play-button.svg" alt="play" />
                  </div>
                )}
                <ReactPlayer
                  className={styles.reactPlayer}
                  playing={playerStart}
                  controls={true}
                  url="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                  light={false}
                  width={'100%'}
                  height={''}
                />
              </div>
              <div className={styles.filmRating}>
                <div className={styles.filmRatingCount}>
                  <span>{grade}</span>
                  /10
                </div>
                <div className={styles.filmRatingBorder}></div>
                <div className={styles.filmRatingGrade}>
                  <div>
                    {' '}
                    {t('movie.rate')} <br /> {t('movie.the film')}
                  </div>
                  <StarRating movie={movie} grade={grade} setGrade={setGrade} />
                </div>
              </div>
              {useMemo(
                () => (
                  <Comments filmId={id} grade={grade !== movie.ratingValue ? grade : ''} t={t} />
                ),
                [grade]
              )}
            </div>
          </div>
          <div className={styles.also}>
            <div className={styles.alsoTitle}>{t('movie.see also')}</div>
            <div className={styles.alsoSubTitle}>{t('movie.only the best premieres')}</div>
            <div className={styles.alsoMovies}>
              {alsoMovies.map((item, index) => (
                <Link key={item.ImdbId} to={`/movie/${item.ImdbId}`}>
                  <div key={index} className={styles.alsoItem}>
                    <img src={item.poster_url} alt="poster" className={styles.alsoItemImg} />
                    <div className={styles.alsoItemName}>{item.name}</div>
                    <span>
                      {item.year.replace(/\D/g, '')} | {item.genre.join(', ')}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Movie;
