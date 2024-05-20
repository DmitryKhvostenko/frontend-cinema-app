import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

import addComment from 'utils/AddComment';
import { useUser } from 'utils/UserProvider';

import styles from './Comments.module.scss';

const Comments = ({ filmId, grade }) => {
  const { t } = useTranslation();
  const { currentUser } = useUser();
  const userName = Object.keys(currentUser)[0];
  const user = Object.values(currentUser)[0];
  const [comments, setComments] = useState(JSON.parse(localStorage.getItem('comments')) || []);
  const [thisComments, setThisComments] = useState([]);
  const savedImage = localStorage.getItem('avatarImage');
  const handleDeleteComent = (id) => {
    const comments = JSON.parse(localStorage.getItem('comments'));

    for (let i = 0; i < comments.length; i++) {
      const commentsArray = comments[i].comments;

      for (let j = 0; j < commentsArray.length; j++) {
        const comment = commentsArray[j];

        if (comment.commentId === id) {
          commentsArray.splice(j, 1);
          localStorage.setItem('comments', JSON.stringify(comments));
          setComments(comments);
          return;
        }
      }
    }
  };

  useEffect(() => {
    const filmComments = comments.find((item) => item.id === filmId);
    setThisComments(filmComments ? filmComments.comments : []);
  }, [filmId, comments]);

  useEffect(() => {
    localStorage.setItem('comments', JSON.stringify(comments));
  }, [comments]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (event.target.text.value.length > 5) {
      const newComment = {
        name: userName ?? event.target.name.value,
        commentId: uuidv4(),
        userId: user && user.id ? user.id : 'incognito',
        time: format(new Date(), 'dd.MM.yyyy HH:mm'),
        text: event.target.text.value,
        grade: grade,
        avatar: savedImage != '' ? savedImage : ' ',
      };
      setComments(addComment(comments, filmId, newComment));
      event.target.reset();
    }
  };
  return (
    <div className={styles.comments}>
      <div className={styles.commentsTitle}>{t('comments.comments title')}</div>
      <div className={styles.commentsWarning}>
        <img src="/images/icons/warning.png" alt="warning" />
        {t('comments.warning')}
      </div>
      <form className={styles.commentsForm} onSubmit={handleSubmit}>
        <textarea
          required
          placeholder={t('comments.textholder')}
          className={styles.commentsTextarea}
          name="text"
          cols="30"
          rows="10"
        ></textarea>
        <div className={styles.commentsSubForm}>
          {!currentUser ? (
            <input
              required
              placeholder={t('comments.nameholder')}
              name="name"
              type="text"
              className={styles.commentsInput}
            />
          ) : (
            ''
          )}
          <input value={t('comments.send')} type="submit" className={styles.commentsButton} />
        </div>
      </form>
      <div className={styles.commentsList}>
        {thisComments &&
          thisComments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div index={index} key={index} className={styles.commentsItem}>
                <div className={styles.commentsHead}>
                  <div className={styles.commentsUserInfo}>
                    <img
                      src={comment.avatar != '' && comment.avatar != null ? comment.avatar : './../images/icons/user-placeholder.png'}
                      onError={(e) => {
                        e.target.src = './../images/icons/user-placeholder.png';
                      }}
                      alt="user-image"
                      className={styles.commentsImage}
                    />
                    <div className={styles.commentsInfo}>
                      <div className={styles.commentsName}>
                        {comment.name}
                        {comment.grade && (
                          <>
                            {' | '}
                            <span>{comment.grade}</span>
                            <img src="/images/AppRating/Full-rating.svg" alt="grade-image" />
                          </>
                        )}{' '}
                      </div>
                      <div className={styles.commentsTime}>{comment.time}</div>
                    </div>
                  </div>
                  {user && comment && user.id === comment.userId && (
                    <button onClick={() => handleDeleteComent(comment.commentId)} className={styles.deleteComment}>
                      <img src=".././images/icons/delete.svg" alt="delete" />
                    </button>
                  )}
                </div>
                <div className={styles.commentsText}>{comment.text}</div>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Comments;
