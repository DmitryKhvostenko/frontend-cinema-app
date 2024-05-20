import { useTranslation } from 'react-i18next';
import { Dropdown, Space } from 'antd';

const ChooseLanguage = () => {
  const { i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const items = [
    {
      label: <a onClick={() => changeLanguage('en')}>English</a>,
      key: '0',
    },
    {
      label: <a onClick={() => changeLanguage('ua')}>Українська</a>,
      key: '1',
    },
  ];
  return (
    <Dropdown
      menu={{
        items,
        selectable: true,
        defaultSelectedKeys: i18n.language === 'ua' ? ['1'] : ['0'],
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()}>
        {i18n.language === 'ua' ? <Space>Українська (UA)</Space> : <Space>English (US)</Space>}
      </a>
    </Dropdown>
  );
};

export default ChooseLanguage;
