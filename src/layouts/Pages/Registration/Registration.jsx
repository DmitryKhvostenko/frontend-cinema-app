import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { fetchRegister, selectIsAuth } from '../../../redux/slices/auth';

import eye from './eye.svg';
import eyeSlash from './eye-slash.svg';

import styles from './Registration.module.scss';

const regExps = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

const Registration = ({ t }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [login, setLogin] = useState('balenciaga');
  const [email, setEmail] = useState('testEmail2@gmail.com');
  const [password, setPassword] = useState('testPassword1');
  const [confirm, setConfirm] = useState('testPassword1');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    if (
      !emailError &&
      !passwordError &&
      !confirmError &&
      login.trim(' ').length > 3 &&
      email != '' &&
      password != '' &&
      confirm != ''
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, passwordError, confirmError, login]);

  const blurHandler = (e) => {
    switch (e.target.name) {
      case 'email': {
        setEmailDirty(true);
        break;
      }
      case 'password': {
        setPasswordDirty(true);
        break;
      }
      case 'confirm': {
        setConfirmDirty(true);
        break;
      }
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (!regExps.email.test(e.target.value)) {
      setEmailError(true);
    } else setEmailError(false);
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (!regExps.password.test(e.target.value)) {
      setPasswordError(true);
    } else setPasswordError(false);
    if (e.target.value != confirm) {
      setConfirmError(true);
    } else setConfirmError(false);
  };

  const confirmHandler = (e) => {
    setConfirm(e.target.value);
    if (e.target.value != password) {
      setConfirmError(true);
    } else setConfirmError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const values = {
      email: email,
      password: password,
      login: login,
      avatarUrl: `${process.env.REACT_APP_API_URL}/uploads/user-placeholder.png`,
    };
    const data = await dispatch(fetchRegister(values));
    if (!data.payload) {
      return alert('Failed to register!');
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  const togglePasswordVisible = () => {
    setIsVisiblePassword(!isVisiblePassword);
  };
  const toggleConfirmVisible = () => {
    setIsVisibleConfirm(!isVisibleConfirm);
  };

  return (
    <div className={styles.registration}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t('registration.title')}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>
              {t('registration.login')}: <span>*</span>
            </div>
            <input
              required
              value={login}
              maxLength="25"
              onChange={(e) => setLogin(e.target.value)}
              className={styles.input}
              type="text"
            />
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>
              {t('registration.email')}: <span>*</span>
            </div>
            <input
              value={email}
              onBlur={blurHandler}
              onChange={(e) => emailHandler(e)}
              name="email"
              required
              className={emailDirty && emailError ? `${styles.input} ${styles.error}` : `${styles.input}`}
              type="text"
            />
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>
              {t('registration.password')}: <span>*</span>
            </div>
            <div className={styles.formItemWrapper}>
              <input
                value={password}
                onBlur={blurHandler}
                onChange={(e) => passwordHandler(e)}
                name="password"
                required
                className={passwordDirty && passwordError ? `${styles.input} ${styles.error}` : `${styles.input}`}
                type={!isVisiblePassword ? 'password' : 'text'}
              />
              <div onClick={togglePasswordVisible} className={styles.formItemEye}>
                <img src={!isVisiblePassword ? eye : eyeSlash} alt="hide password" />
              </div>
              <div className={styles.formItemTip}>{t('registration.tip')}.</div>
            </div>
          </div>
          <div className={styles.formItem}>
            <div className={styles.formItemTitle}>
              {t('registration.confirm password')}: <span>*</span>
            </div>
            <div className={styles.formItemWrapper}>
              <input
                value={confirm}
                onBlur={blurHandler}
                onChange={(e) => confirmHandler(e)}
                name="confirm"
                required
                className={confirmDirty && confirmError ? `${styles.input} ${styles.error}` : `${styles.input}`}
                type={!isVisibleConfirm ? 'password' : 'text'}
              />
              <div onClick={toggleConfirmVisible} className={styles.formItemEye}>
                <img src={!isVisibleConfirm ? eye : eyeSlash} alt="hide password" />
              </div>
            </div>
          </div>
          <input
            value={t('registration.send')}
            disabled={!formValid}
            className={formValid ? `${styles.submit}` : `${styles.submit} ${styles.btnError}`}
            type="submit"
          />
        </form>
      </div>
    </div>
  );
};

export default Registration;
