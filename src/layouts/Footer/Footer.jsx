import { Link } from 'react-router-dom';
import ChooseLanguage from 'components/ChooseLanguage/ChooseLanguage';

import logo from './logo.svg';

import styles from './Footer.module.scss';

const Footer = ({ t }) => {
  return (
    <div className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.footerTop}>
          <Link to="/" className={styles.footerLogo}>
            <img src={logo} alt="logo" />
          </Link>
          <nav className={styles.footerNav}>
            <ul className={styles.footerList}>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('company')}
                </Link>
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('about')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('careers')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('our culture')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('giving')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('partners')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('press room')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('elex gear')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('the elex blog')}
                </Link>{' '}
              </li>
            </ul>
            <ul className={styles.footerList}>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('elex pass')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('go premium')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('elexamp')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('elex labs')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('get perks')}
                </Link>{' '}
              </li>
            </ul>
            <ul className={styles.footerList}>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('downloads')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('elex media server')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('apps & devices')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('where to watch')}
                </Link>{' '}
              </li>
            </ul>
            <ul className={styles.footerList}>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('support')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('finding help')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('support library')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('community forums')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('billing questions')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('status')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('bug bounty')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('cordcutter')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('get in touch')}
                </Link>{' '}
              </li>
            </ul>
            <ul className={styles.footerList}>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('watch free')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('tv channel finder')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('what to watch')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('what to watch on hulu')}
                </Link>{' '}
              </li>
              <li className={styles.footerItem}>
                <Link to="/placeholder" className={styles.footerLink}>
                  {t('a24 collection')}
                </Link>{' '}
              </li>
            </ul>
          </nav>
        </div>
        <div className={styles.footerBottom}>
          <nav className={styles.footerBottomNav}>
            <div> {t('footer.copyright')} © 2024 Elex </div>
            <Link to="/placeholder" className={styles.footerBottomLink}>
              {t('footer.privacy & legal')}
            </Link>
            <Link to="/placeholder" className={styles.footerBottomLink}>
              {t('footer.accessibility')}
            </Link>
            <Link to="/placeholder" className={styles.footerBottomLink}>
              {t('footer.manage cookies')}
            </Link>
            <div>
              {t('footer.language')}: <ChooseLanguage />
            </div>
          </nav>
          <div className={styles.footerBottomSocial}>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z " />
              </svg>
            </Link>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 5 3 C 3.897 3 3 3.897 3 5 L 3 19 C 3 20.103 3.897 21 5 21 L 11.621094 21 L 14.414062 21 L 19 21 C 20.103 21 21 20.103 21 19 L 21 5 C 21 3.897 20.103 3 19 3 L 5 3 z M 5 5 L 19 5 L 19.001953 19 L 14.414062 19 L 14.414062 15.035156 L 16.779297 15.035156 L 17.130859 12.310547 L 14.429688 12.310547 L 14.429688 10.574219 C 14.429687 9.7862188 14.649297 9.2539062 15.779297 9.2539062 L 17.207031 9.2539062 L 17.207031 6.8222656 C 16.512031 6.7512656 15.814234 6.71675 15.115234 6.71875 C 13.041234 6.71875 11.621094 7.9845938 11.621094 10.308594 L 11.621094 12.314453 L 9.2773438 12.314453 L 9.2773438 15.039062 L 11.621094 15.039062 L 11.621094 19 L 5 19 L 5 5 z" />
              </svg>
            </Link>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                {' '}
                <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
              </svg>
            </Link>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 6 3 C 4.3550302 3 3 4.3550302 3 6 L 3 18 C 3 19.64497 4.3550302 21 6 21 L 18 21 C 19.64497 21 21 19.64497 21 18 L 21 6 C 21 4.3550302 19.64497 3 18 3 L 6 3 z M 6 5 L 18 5 C 18.56503 5 19 5.4349698 19 6 L 19 18 C 19 18.56503 18.56503 19 18 19 L 6 19 C 5.4349698 19 5 18.56503 5 18 L 5 6 C 5 5.4349698 5.4349698 5 6 5 z M 12 7 L 12 14 C 12 14.56503 11.56503 15 11 15 C 10.43497 15 10 14.56503 10 14 C 10 13.43497 10.43497 13 11 13 L 11 11 C 9.3550302 11 8 12.35503 8 14 C 8 15.64497 9.3550302 17 11 17 C 12.64497 17 14 15.64497 14 14 L 14 10.232422 C 14.616148 10.671342 15.259118 11 16 11 L 16 9 C 15.952667 9 15.262674 8.7809373 14.78125 8.3613281 C 14.299826 7.941719 14 7.4149911 14 7 L 12 7 z" />
              </svg>
            </Link>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 5 3 C 3.895 3 3 3.895 3 5 L 3 19 C 3 20.105 3.895 21 5 21 L 19 21 C 20.105 21 21 20.105 21 19 L 21 5 C 21 3.895 20.105 3 19 3 L 5 3 z M 5 5 L 19 5 L 19 19 L 5 19 L 5 5 z M 7.7792969 6.3164062 C 6.9222969 6.3164062 6.4082031 6.8315781 6.4082031 7.5175781 C 6.4082031 8.2035781 6.9223594 8.7167969 7.6933594 8.7167969 C 8.5503594 8.7167969 9.0644531 8.2035781 9.0644531 7.5175781 C 9.0644531 6.8315781 8.5502969 6.3164062 7.7792969 6.3164062 z M 6.4765625 10 L 6.4765625 17 L 9 17 L 9 10 L 6.4765625 10 z M 11.082031 10 L 11.082031 17 L 13.605469 17 L 13.605469 13.173828 C 13.605469 12.034828 14.418109 11.871094 14.662109 11.871094 C 14.906109 11.871094 15.558594 12.115828 15.558594 13.173828 L 15.558594 17 L 18 17 L 18 13.173828 C 18 10.976828 17.023734 10 15.802734 10 C 14.581734 10 13.930469 10.406562 13.605469 10.976562 L 13.605469 10 L 11.082031 10 z" />
              </svg>
            </Link>
            <Link to="/placeholder" className={styles.footerBottomSocialLink}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M 12 4 C 12 4 5.7455469 3.9999687 4.1855469 4.4179688 C 3.3245469 4.6479688 2.6479687 5.3255469 2.4179688 6.1855469 C 1.9999687 7.7455469 2 12 2 12 C 2 12 1.9999687 16.254453 2.4179688 17.814453 C 2.6479687 18.675453 3.3255469 19.352031 4.1855469 19.582031 C 5.7455469 20.000031 12 20 12 20 C 12 20 18.254453 20.000031 19.814453 19.582031 C 20.674453 19.352031 21.352031 18.674453 21.582031 17.814453 C 22.000031 16.254453 22 12 22 12 C 22 12 22.000031 7.7455469 21.582031 6.1855469 C 21.352031 5.3255469 20.674453 4.6479688 19.814453 4.4179688 C 18.254453 3.9999687 12 4 12 4 z M 12 6 C 14.882 6 18.490875 6.1336094 19.296875 6.3496094 C 19.465875 6.3946094 19.604391 6.533125 19.650391 6.703125 C 19.891391 7.601125 20 10.342 20 12 C 20 13.658 19.891391 16.397875 19.650391 17.296875 C 19.605391 17.465875 19.466875 17.604391 19.296875 17.650391 C 18.491875 17.866391 14.882 18 12 18 C 9.119 18 5.510125 17.866391 4.703125 17.650391 C 4.534125 17.605391 4.3956094 17.466875 4.3496094 17.296875 C 4.1086094 16.398875 4 13.658 4 12 C 4 10.342 4.1086094 7.6011719 4.3496094 6.7011719 C 4.3946094 6.5331719 4.533125 6.3946094 4.703125 6.3496094 C 5.508125 6.1336094 9.118 6 12 6 z M 10 8.5351562 L 10 15.464844 L 16 12 L 10 8.5351562 z" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
