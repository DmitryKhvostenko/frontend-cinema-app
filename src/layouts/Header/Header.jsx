import { memo, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import disableScroll from 'disable-scroll';

import HeaderScrolling from 'utils/HeaderScrolling';
import { useUser } from 'utils/UserProvider';
import BurgerMenu from 'components/BurgerMenu/BurgerMenu';
import FindFilms from 'components/FindFilms/FindFilms';
import PopUpLogin from 'components/PopUpLogin/PopUpLogin';

import logo from './logo.svg';

import styles from './Header.module.scss';

const Header = ({ t }) => {
  const scrolling = HeaderScrolling();
  const { currentUser, setCurrentUser } = useUser();
  const navigate = useNavigate();
  const userLogin = Object.keys(currentUser)[0] ?? Object.keys(currentUser)[0];
  const [isPopup, setIsPopup] = useState(false);
  const [isBurger, setIsBurger] = useState(false);
  const handleCloseMenu = () => {
    setIsBurger(false);
  };
  const handleStateChange = (state) => {
    setIsBurger(state.isOpen);
  };

  const handleLeave = () => {
    localStorage.setItem('currentUser', '');
    localStorage.setItem('avatarImage', '');
    navigate('/');
    setCurrentUser('');
  };
  useEffect(() => {
    isPopup == true || isBurger == true ? disableScroll.on() : disableScroll.off();
  }, [isPopup, isBurger]);
  return (
    <>
      <header className={`${styles.header} ${scrolling ? styles.scrollingHeader : ''}`}>
        <div className={`${styles.headerTop} ${scrolling ? styles.scrolling : ''}`}>
          <div className={styles.left}>
            <div className={styles.logo}>
              <NavLink to="/">
                <img src={logo} alt="logo" />
              </NavLink>
            </div>
            <FindFilms />
          </div>
          <div className={styles.right}>
            <nav className={styles.nav}>
              <NavLink to="/">{t('header.home')}</NavLink>
              <NavLink to="/catalog">{t('header.catalog')}</NavLink>
              <NavLink
                to={localStorage.getItem('lastFilm') ? `/movie/${localStorage.getItem('lastFilm')}` : '/catalog'}
              >
                {t('header.film')}
              </NavLink>
              <NavLink to="/placeholder">{t('header.about')}</NavLink>
            </nav>
            <div className={styles.border}></div>
            {currentUser ? (
              <div className={styles.userWrapper}>
                <NavLink className={styles.user} to="/profile">
                  {userLogin}
                </NavLink>
                <div className={styles.border}></div>
                <button onClick={handleLeave} className={styles.exit}>
                  <img src="./../images/icons/exit.svg" alt="exit" />
                </button>
              </div>
            ) : (
              <div className={styles.buttons}>
                <button
                  onClick={() => {
                    setIsPopup(true);
                  }}
                  className={styles.link}
                >
                  {t('header.signIn')}
                </button>
                <NavLink className={styles.link} to="/registration">
                  {t('header.signUp')}
                </NavLink>
              </div>
            )}
          </div>
          <button className={styles.burgerButton}>
            <BurgerMenu
              isOpen={isBurger}
              onOpen={() => {
                setIsBurger(true);
              }}
              onClose={() => {
                setIsBurger(false);
              }}
              right
              onStateChange={handleStateChange}
              handleCloseMenu={handleCloseMenu}
              setIsPopup={() => setIsPopup(true)}
              userLogin={userLogin}
              handleLeave={handleLeave}
            />
          </button>
        </div>
      </header>
      <PopUpLogin isOpen={isPopup} onClose={() => setIsPopup(false)} />
    </>
  );
};

export default memo(Header);