import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import exit from './exit.svg';

import styles from './BurgerMenu.module.scss';

export default (props) => {
  const { t } = useTranslation();
  const { handleCloseMenu, setIsPopup, handleLeave } = props;
  const authData = useSelector((state) => state.auth.data);

  return (
    <Menu {...props}>
      <div className={styles.buttons}>
        {authData ? (
          <div className={styles.userWrapper}>
            <NavLink onClick={() => handleCloseMenu()} className={styles.user} to="/profile">
              {authData.login}
            </NavLink>
          </div>
        ) : (
          <div className={styles.buttons}>
            <button
              onClick={() => {
                setIsPopup();
              }}
              className={styles.link}
            >
              {t('header.signIn')}
            </button>
            <NavLink onClick={() => handleCloseMenu()} className={styles.link} to="/registration">
              {t('header.signUp')}
            </NavLink>
          </div>
        )}
      </div>
      <div className={styles.border}></div>
      <NavLink onClick={() => handleCloseMenu()} className="menu-item" to="/">
        {t('header.home')}
      </NavLink>
      <NavLink onClick={() => handleCloseMenu()} className="menu-item" to="/catalog">
        {t('header.catalog')}
      </NavLink>
      <NavLink
        onClick={() => handleCloseMenu()}
        className="menu-item"
        to={localStorage.getItem('lastFilm') ? `/movie/${localStorage.getItem('lastFilm')}` : '/catalog'}
      >
        {t('header.film')}
      </NavLink>
      <NavLink onClick={() => handleCloseMenu()} className="menu-item" to="/placeholder">
        {t('header.about')}
      </NavLink>

      {authData && (
        <button onClick={handleLeave} className={styles.exit}>
          <div className={styles.exitWrapper}>
            <img src={exit} alt="exit" />
          </div>
        </button>
      )}
    </Menu>
  );
};
