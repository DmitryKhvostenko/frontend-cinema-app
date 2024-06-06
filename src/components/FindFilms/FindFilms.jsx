import { useEffect } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import movies from 'backend/Movies.json';
import handleError from 'utils/ImagePlaceholder';

import styles from './FindFilms.module.scss';

const FindFilms = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const handleInputChange = (event) => {
    const input = event.target.value;
    setQuery(input);
  };

  const blurInput = () => {
    const timeoutId = setTimeout(() => {
      setSuggestions([]);
      setQuery('');
    }, 300);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    } else {
      const filteredMovies = movies.filter((movie) => movie.name.toLowerCase().includes(query.toLowerCase()));
      setSuggestions(filteredMovies.slice(0, 7));
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    navigate(`/movie/${suggestion.ImdbId}`);
  };
  return (
    <div className={styles.wrapper}>
      <input
        onChange={handleInputChange}
        placeholder={t('findFilms.placeholder')}
        className={styles.input}
        onBlur={blurInput}
        onFocus={handleInputChange}
      />
      <ul className={styles.list}>
        {suggestions.map((suggestion, index) => (
          <li className={styles.item} key={index} onClick={() => handleSuggestionClick(suggestion)}>
            <img onError={handleError} src={suggestion.poster_url} alt="" />
            <div className={styles.info}>
              <div>{suggestion.name}</div>
              <div>
                {suggestion.genre} <span>·</span> {suggestion.year}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FindFilms;
