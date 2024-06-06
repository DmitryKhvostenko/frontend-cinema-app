import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios';

import { updateProfile } from './../../redux/slices/auth';

import styles from './AvatarComponent.module.scss';

const AvatarComponent = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);
  const [avatarUrl, setAvatarUrl] = useState(authData ? authData.avatarUrl : '');
  const { t } = useTranslation();

  useEffect(() => {
    if (authData && authData.avatarUrl) {
      setAvatarUrl(authData.avatarUrl);
    }
  }, [authData]);

  const handleFileChange = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setAvatarUrl(`${process.env.REACT_APP_API_URL}${data.url}`);
      dispatch(updateProfile({ id: authData._id, avatarUrl: `${process.env.REACT_APP_API_URL}${data.url}` }));

      console.log(data);
    } catch (err) {
      console.warn(err);
      alert('Ошибка при загрузке файла!');
    }
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <div className={styles.imageWrapper}>
          <div className={styles.hoverImage}>{t('avatar.choose')}</div>
          <img
            onError={(e) => {
              e.target.src = './images/icons/user-placeholder.png';
            }}
            className={styles.image}
            src={avatarUrl || './images/icons/user-placeholder.png'}
            alt="Select Image"
          />
        </div>
      </label>
      <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default memo(AvatarComponent);
