import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import NewUser from 'utils/NewUser';
import { useUser } from 'utils/UserProvider';

import styles from './Registration.module.scss';

const regExps = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
};

const Registration = ({ t }) => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmDirty, setConfirmDirty] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmError, setConfirmError] = useState(false);

  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const { setCurrentUser } = useUser();

  useEffect(() => {
    if (!emailError && !passwordError && !confirmError && email != '' && password != '' && confirm != '') {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [emailError, passwordError, confirmError]);

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
  };

  const confirmHandler = (e) => {
    setConfirm(e.target.value);
    if (e.target.value != password) {
      setConfirmError(true);
    } else setConfirmError(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      [login]: {
        id: uuidv4(),
        login: login,
        email: email,
        password: password,
        regDate: new Date().toISOString().split('T')[0],
        avatar: '',
      },
    };
    NewUser(newUser);
    navigate('/');
    setCurrentUser(newUser);
  };

  return (
    <div className={styles.registration}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t('registration.title')}</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formItem}>
            <div>
              {t('registration.login')}: <span>*</span>
            </div>
            <input
              required
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className={styles.input}
              type="text"
            />
          </div>
          <div className={styles.formItem}>
            <div>
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
            <div>
              {t('registration.password')}: <span>*</span>
            </div>
            <input
              value={password}
              onBlur={blurHandler}
              onChange={(e) => passwordHandler(e)}
              name="password"
              required
              className={passwordDirty && passwordError ? `${styles.input} ${styles.error}` : `${styles.input}`}
              type="password"
            />
          </div>
          <div className={styles.formItem}>
            <div>
              {t('registration.confirm password')}: <span>*</span>
            </div>
            <input
              value={confirm}
              onBlur={blurHandler}
              onChange={(e) => confirmHandler(e)}
              name="confirm"
              required
              className={confirmDirty && confirmError ? `${styles.input} ${styles.error}` : `${styles.input}`}
              type="password"
            />
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
