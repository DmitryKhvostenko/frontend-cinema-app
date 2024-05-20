import React, { memo, useEffect, useState } from 'react';
import {useTranslation} from 'react-i18next';


import styles from './AvatarComponent.module.scss';

const AvatarComponent = ({ currentUser }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const comments = JSON.parse(localStorage.getItem('comments'));
  const {t} = useTranslation();

  useEffect(() => {
    const savedImage = localStorage.getItem('avatarImage');
    if (savedImage) {
      setSelectedFile(savedImage);
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setSelectedFile(imageUrl);
    localStorage.setItem('avatarImage', imageUrl);
    updateAvatarInLocalStorage(currentUser.id, imageUrl);
    updateCommentsAvatar(imageUrl);
  };

  const updateCommentsAvatar = (imageUrl) => {
    const updatedComments = comments.map((comment) => {
      if (comment.comments) {
        comment.comments = comment.comments.map((commentItem) => {
          if (commentItem.name === currentUser.login && commentItem.avatar !== undefined) {
            commentItem.avatar = imageUrl;
          }
          return commentItem;
        });
      }
      return comment;
    });
    localStorage.setItem('comments', JSON.stringify(updatedComments));
  };

  const updateAvatarInLocalStorage = (userId, imageUrl) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updatedUsers = users.map((userObj) => {
      const username = Object.keys(userObj)[0];
      if (userObj[username].id === userId) {
        return {
          [username]: {
            ...userObj[username],
            avatar: imageUrl,
          },
        };
      }
      return userObj;
    });
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  return (
    <div>
      <label htmlFor="fileInput">
        <div className={styles.imageWrapper}>
          <div className={styles.hoverImage}>{t('avatar.choose')}</div>
          <img
            onError={(e) => {
              e.target.src = './images/icons/user-placeholder.png';
            }}
            className={styles.image}
            src={selectedFile || './images/icons/user-placeholder.png'}
            alt="Select Image"
          />
        </div>
      </label>
      <input id="fileInput" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
    </div>
  );
};

export default memo(AvatarComponent);
