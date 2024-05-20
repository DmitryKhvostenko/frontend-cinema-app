import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useUser } from 'utils/UserProvider';

import closeImg from './close.svg';

import styles from './PopUpProfile.module.scss';

const PopUpProfile = ({ isOpen, onClose, currentUser }) => {
  const { t } = useTranslation();

  const profileContentRef = useRef(null);
  const [name, setName] = useState('');
  const comments = JSON.parse(localStorage.getItem('comments'));
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const { setCurrentUser } = useUser();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateNameInLocalStorage(currentUser.id, name);
    updateCommentsName(name);
    onClose();
  };

  const updateCommentsName = (newName) => {
    const updatedComments = comments.map((comment) => {
      if (comment.comments) {
        comment.comments = comment.comments.map((commentItem) => {
          if (commentItem.userId === currentUser.id) {
            commentItem.name = newName;
          }
          return commentItem;
        });
      }
      return comment;
    });
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const updateNameInLocalStorage = (userId, newName) => {
    const updatedUsers = users.map((userObj) => {
      const username = Object.keys(userObj)[0];
      if (userObj[username].id === userId) {
        const updatedUser = {
          [newName]: {
            ...userObj[username],
            id: userId,
            login: newName,
          },
        };
        delete updatedUser[username];
        setCurrentUser(updatedUser);
        return updatedUser;
      }
      return userObj;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
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
