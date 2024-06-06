import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';

import { fetchAuth, selectIsAuth } from '../../redux/slices/auth';

import closeImg from './close.svg';
import eye from './eye.svg';
import eyeSlash from './eye-slash.svg';

import styles from './PopUpLogin.module.scss';

const PopUpLogin = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [email, setEmail] = useState('testEmail1@gmail.com');
  const [password, setPassword] = useState('123123123wW');
  const [isUserDumb, setIsUserDumb] = useState(false);
  const signInContentRef = useRef(null);
  const [isVisiblePassword, setisVisiblePassword] = useState(false);

  const togglePasswordVisible = () => {
    setisVisiblePassword(!isVisiblePassword);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      const values = {
        email: email,
        password: password,
      };
      const data = await dispatch(fetchAuth(values));
      if (!data.payload) {
        return alert('Failed to login!');
      }
      if ('token' in data.payload) {
        window.localStorage.setItem('token', data.payload.token);
      }
    } else setIsUserDumb(true);
  };

  if (isAuth) {
    onClose();
    return <Navigate to="/" />;
  }
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
                    type="email"
                    className={styles.signInInput}
                  />
                </div>
                <div className={styles.signInBlock}>
                  <div className={styles.signInText}>{t('signIn.password')}</div>
                  <div className={styles.signInWrapper}>
                    <input
                      name="password"
                      value={password}
                      placeholder={t('signIn.placeholderPassword')}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type={!isVisiblePassword ? 'password' : 'text'}
                      className={styles.signInInput}
                    />
                    <div onClick={togglePasswordVisible} className={styles.signInEye}>
                      <img src={!isVisiblePassword ? eye : eyeSlash} alt="hide password" />
                    </div>
                  </div>
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
