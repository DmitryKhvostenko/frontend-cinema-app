import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { updateProfile } from '../../redux/slices/auth';

import closeImg from './close.svg';

import styles from './PopUpProfile.module.scss';

const PopUpProfile = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth.data);
  const { t } = useTranslation();

  const profileContentRef = useRef(null);
  const [name, setName] = useState('');

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (profileContentRef.current && !profileContentRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
    }

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile({ id: authData._id, login: name }));
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div className={styles.profile}>
          <div className={styles.profileBackground}>
            <div className={styles.profileContent} ref={profileContentRef}>
              <div className={styles.profileHeader}>
                <div>{t('profile.edit.title')}</div>
                <button
                  onClick={() => {
                    onClose();
                  }}
                  className={styles.profileClose}
                >
                  <img src={closeImg} alt="close" />
                </button>
              </div>
              <form autoComplete="off" onSubmit={handleSubmit} className={styles.profileMain}>
                <div className={styles.profileBlock}>
                  <div className={styles.profileText}>{t('profile.edit.name')}</div>
                  <input
                    name="name"
                    value={name}
                    minLength="3"
                    maxLength="15"
                    placeholder={t('profile.edit.placeholderName')}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    type="text"
                    className={styles.profileInput}
                  />
                </div>
                <input type="submit" value={t('profile.edit.confirm')} name="submit" className={styles.profileButton} />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpProfile;
