import { useEffect, useState } from 'react';
import Movies from 'backend/Movies.json';
import FilterCatalog from 'components/FilterCatalog/FilterCatalog';
import MovieCard from 'components/MovieCard/MovieCard';
import SortCatalog from 'components/SortCatalog/SortCatalog';
import sortFilms from 'utils/SortedCatalog';

import styles from './Catalog.module.scss';

const Catalog = ({ t }) => {
  const [filterValue, setFilterValue] = useState(Movies);
  const [sorterValue, setSorterValue] = useState('bestRating');
  const [sortedMovies, setSortedMovies] = useState(sortFilms(sorterValue, Movies));
  const [filteredMovies, setFilteredMovies] = useState(Movies);
  const [activeFilters, setActiveFilters] = useState([
    { id: 'year', label: 'Year', isActive: false, showedFilms: Movies },
    { id: 'genre', label: 'Genre', isActive: false, showedFilms: Movies },
  ]);
  const refreshFilter = (filterId, updateFields) => {
    setActiveFilters((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.id === filterId) {
          return { ...filter, ...updateFields };
        }
        return filter;
      });
    });
  };
  useEffect(() => {
    if (filterValue) {
      switch (filterValue.key) {
        case 'year': {
          const filteredMovies = Movies.filter((movie) => movie.year === filterValue.value);
          refreshFilter('year', {
            isActive: true,
            showedFilms: filteredMovies,
            label: filterValue.value,
          });
          break;
        }
        case 'genre': {
          const filteredMovies = Movies.filter((movie) =>
            movie.genre.some((genre) => genre.trim() === filterValue.value.trim())
          );
          refreshFilter('genre', {
            isActive: true,
            showedFilms: filteredMovies,
            label: filterValue.value,
          });
          break;
        }
      }
    }
  }, [filterValue]);

  useEffect(() => {
    setSortedMovies(sortFilms(sorterValue, filteredMovies));
  }, [sorterValue, filteredMovies]);

  useEffect(() => {
    let updatedFilteredMovies = Movies;
    for (const filter of activeFilters) {
      if (filter.isActive) {
        updatedFilteredMovies = updatedFilteredMovies.filter((movie) => filter.showedFilms.includes(movie));
      }
    }
    setFilteredMovies(updatedFilteredMovies);
  }, [activeFilters]);

  return (
    <div className={styles.catalog}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.headerTop}>
            <FilterCatalog getFilterValue={setFilterValue} />
            <SortCatalog setSorterValue={setSorterValue} />
          </div>
          <div className={styles.border}></div>
          <div className={styles.headerBottom}>
            <div className={styles.filtersLabel}>{t('catalog.filter by')}: </div>
            {activeFilters.map(
              (item) =>
                item.isActive && (
                  <div className={styles.activeFilterItem} key={item.id}>
                    <div>{item.label}</div>
                    <div className={styles.disableFilter} onClick={() => refreshFilter(item.id, { isActive: false })}>
                      <img src="./images/icons/close.svg" alt="close" />
                    </div>
                  </div>
                )
            )}
          </div>
        </div>
        <div className={styles.main}>
          <ul className={styles.list}>
            {sortedMovies.map((movie) => (
              <MovieCard
                key={movie.ImdbId}
                id={movie.ImdbId}
                poster_url={movie.poster_url}
                name={movie.name}
                year={movie.year}
                ratingValue={movie.ratingValue}
                genre={movie.genre}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
