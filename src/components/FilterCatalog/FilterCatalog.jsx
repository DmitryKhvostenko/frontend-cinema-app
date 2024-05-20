import React from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Space } from 'antd';

import GenreMap from 'utils/GenreMap';

import movies from 'backend/Movies.json';

import styles from './FilterCatalog.module.scss';

import { DownOutlined } from '@ant-design/icons';

const FilterCatalog = ({ getFilterValue }) => {
  const { i18n, t } = useTranslation();
  const validLanguages = ['en', 'ua'];
  const language = validLanguages.includes(i18n.language) ? i18n.language : 'en';

  const compareByYear = (a, b) => parseInt(b) - parseInt(a);

  const uniqueSortedYears = [...new Set(movies.map((movie) => parseInt(movie.year)))].sort(compareByYear);
  const uniqueSortedGenres = [...new Set(movies.map((movie) => movie.genre[0]))];
  const translatedGenres = uniqueSortedGenres.map((genre) => GenreMap[language][genre.trim()]);

  const items = [
    {
      key: '1',
      label: t('catalog.filter year'),
      children: uniqueSortedYears.map((year) => ({
        key: year,
        value: 'year',
        label: year.toString(),
      })),
    },
    {
      key: '2',
      label: t('catalog.filter genre'),
      children: translatedGenres.map((genre) => ({
        key: genre.toString(),
        value: 'genre',
        label: genre.toString(),
      })),
    },
  ];

  const onClick = (item) => {
    getFilterValue({
      key: item.item.props.value,
      value: item.key,
    });
  };

  return (
    <Dropdown
      className={styles.dropdown}
      arrow={false}
      menu={{
        items,
        onClick,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {t('catalog.filter dropdown')}
          <DownOutlined className={styles.arrow} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default FilterCatalog;
