import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from 'utils/UserProvider';

import closeImg from './close.svg';

import styles from './PopUpLogin.module.scss';

const PopUpLogin = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isUserDumb, setIsUserDumb] = useState(false);
  const usersArray = JSON.parse(localStorage.getItem('users'));
  const { setCurrentUser } = useUser();
  const signInContentRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    const handleClickOutside = (event) => {
      if (signInContentRef.current && !signInContentRef.current.contains(event.target)) {
        onClose();
        setIsUserDumb(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = usersArray.find((userObject) => {
      const userData = Object.values(userObject)[0];
      return userData.email === email;
    });

    if (user && password === Object.values(user)[0].password) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentUser(user);
      setEmail('');
      setPassword('');
      onClose();
      setIsUserDumb(false);
    } else {
      setIsUserDumb(true);
    }
  };
  return (
    <>
      {isOpen && (
        <div className={styles.signIn}>
          <div className={styles.signInBackground}>
            <div className={styles.signInContent} ref={signInContentRef}>
              <div className={styles.signInHeader}>
                <div>{t('signIn.title')}</div>
                <button
                  onClick={() => {
                    onClose();
                    setIsUserDumb(false);
                  }}
                  className={styles.signInClose}
                >
                  <img src={closeImg} alt="close" />
                </button>
              </div>
              <form autoComplete="off" onSubmit={handleSubmit} className={styles.signInMain}>
                <div className={styles.signInBlock}>
                  <div className={styles.signInText}>{t('signIn.email')}</div>
                  <input
                    name="email"
                    value={email}
                    placeholder={t('signIn.placeholderEmail')}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="text"
                    className={styles.signInInput}
                  />
                </div>
                <div className={styles.signInBlock}>
                  <div className={styles.signInText}>{t('signIn.password')}</div>
                  <input
                    name="password"
                    value={password}
                    placeholder={t('signIn.placeholderPassword')}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    className={styles.signInInput}
                  />
                </div>
                <input type="submit" value={t('signIn.confirm')} name="submit" className={styles.signInButton} />
                {isUserDumb && (
                  <div className={styles.signInOnError}>
                    {t('signIn.error1')}
                    <br />
                    {t('signIn.error2')}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PopUpLogin;
