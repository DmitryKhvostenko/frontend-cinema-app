import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';

import { useUser } from 'utils/UserProvider';

import styles from './BurgerMenu.module.scss';

export default (props) => {
  const { t } = useTranslation();
  const { handleCloseMenu, setIsPopup, userLogin, handleLeave } = props;
  const { currentUser } = useUser();

  return (
    <Menu {...props}>
      <div className={styles.buttons}>
        {currentUser ? (
          <div className={styles.userWrapper}>
            <NavLink className={styles.user} to="/profile">
              {userLogin}
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
        Home
      </NavLink>
      <NavLink onClick={() => handleCloseMenu()} className="menu-item" to="/catalog">
        Catalog
      </NavLink>
      <NavLink
        onClick={() => handleCloseMenu()}
        className="menu-item"
        to={localStorage.getItem('lastFilm') ? `/movie/${localStorage.getItem('lastFilm')}` : '/catalog'}
      >
        Film
      </NavLink>
      <NavLink onClick={() => handleCloseMenu()} className="menu-item" to="/about">
        About us
      </NavLink>

      {currentUser && (
        <button onClick={handleLeave} className={styles.exit}>
          <div className={styles.exitWrapper}>
            <img src="./../images/icons/exit.svg" alt="exit" />
          </div>
        </button>
      )}
    </Menu>
  );
};
