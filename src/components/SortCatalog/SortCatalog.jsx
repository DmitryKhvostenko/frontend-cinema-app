import { useTranslation } from 'react-i18next';
import { Dropdown, Space } from 'antd';

import styles from './SortCatalog.module.scss';

import { DownOutlined } from '@ant-design/icons';

const SortCatalog = ({ setSorterValue }) => {
  const { t } = useTranslation();
  const items = [
    {
      label: <a onClick={() => setSorterValue('bestRating')}>{t('catalog.sort bestRating')}</a>,
      key: '0',
    },
    {
      label: <a onClick={() => setSorterValue('worstRating')}>{t('catalog.sort worstRating')}</a>,
      key: '1',
    },
    {
      label: <a onClick={() => setSorterValue('mostPopular')}>{t('catalog.sort mostPopular')}</a>,
      key: '2',
    },
    {
      label: <a onClick={() => setSorterValue('leastPopular')}>{t('catalog.sort leastPopular')}</a>,
      key: '3',
    },
  ];
  return (
    <Dropdown
      className={styles.dropdown}
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: ['0'],
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {t('catalog.sort dropdown')}
          <DownOutlined className={styles.arrow} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default SortCatalog;
