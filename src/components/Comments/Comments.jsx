import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../../axios';
import { commentsByFilmId, deleteComment } from '../../redux/slices/comments';

import ratingImg from './full-rating.svg';

import styles from './Comments.module.scss';

const Comments = ({ filmId, grade }) => {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const prevComments = useSelector((state) => state.comments.comments);
  useEffect(() => {
    if (prevComments) {
      console.log(prevComments);
      console.log(comments);
      setComments(prevComments);
    }
  }, [filmId, prevComments]);

  useEffect(() => {
    dispatch(commentsByFilmId(filmId));
  }, [filmId]);

  const authData = useSelector((state) => state.auth.data);
  const { t } = useTranslation();
  const [isWarning, setIsWarning] = useState(false);
  const handleDeleteComment = async (id) => {
    try {
      await dispatch(deleteComment(id));
      await dispatch(commentsByFilmId(filmId));
    } catch (error) {
      console.error('Error deleting comment or fetching comments: ', error);
    }
  };

  const handleSubmit = async (event, form) => {
    event.preventDefault();
    if (form.elements.text.value.length > 4) {
      try {
        const fields = {
          login: authData.login,
          text: form.elements.text.value,
          ...(grade && { rating: grade }),
          avatarUrl: authData.avatarUrl,
          filmId: filmId,
        };

        const { data } = await axios.post('/comments', fields);
        dispatch(commentsByFilmId(filmId));
        form.reset();
      } catch (err) {
        console.warn(err);
        console.log('Ошибка при отправке комментария');
      }
    } else shakingWarning();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event, event.target.form);
    }
  };

  const shakingWarning = () => {
    setIsWarning(true);
    setTimeout(() => {
      setIsWarning(false);
    }, 400);
  };

  return (
    <div className={styles.comments}>
      <div className={styles.commentsTitle}>{t('comments.comments title')}</div>
      <div className={isWarning ? `${styles.commentsWarning} ${styles.active}` : `${styles.commentsWarning}`}>
        <img src="./../images/icons/warning.png" alt="warning" />
        {authData ? t('comments.warning') : t('comments.alternate warning')}
      </div>
      {authData && (
        <>
          <form
            className={styles.commentsForm}
            onSubmit={(event) => handleSubmit(event, event.target)}
            onKeyPress={handleKeyPress}
          >
            <textarea
              required
              placeholder={t('comments.textholder')}
              className={styles.commentsTextarea}
              name="text"
              cols="30"
              rows="10"
            ></textarea>
            <div className={styles.commentsSubForm}>
              <button type="submit" className={styles.commentsButton}>
                {t('comments.send')}
              </button>
            </div>
          </form>
        </>
      )}

      <div className={styles.commentsList}>
        {comments &&
          comments
            .slice()
            .reverse()
            .map((comment, index) => (
              <div index={index} key={index} className={styles.commentsItem}>
                <div className={styles.commentsHead}>
                  <div className={styles.commentsUserInfo}>
                    <img
                      src={
                        comment.user.avatarUrl != '' && comment.user.avatarUrl != null
                          ? comment.user.avatarUrl
                          : './../images/icons/user-placeholder.png'
                      }
                      onError={(e) => {
                        e.target.src = './../images/icons/user-placeholder.png';
                      }}
                      alt="user-image"
                      className={styles.commentsImage}
                    />
                    <div className={styles.commentsInfo}>
                      <div className={styles.commentsName}>
                        {comment.user.login}
                        {comment.rating && (
                          <>
                            {' | '}
                            <span>{comment.rating}</span>
                            <img src={ratingImg} alt="grade-image" />
                          </>
                        )}{' '}
                      </div>
                      <div className={styles.commentsTime}>{comment.createdAt}</div>
                    </div>
                  </div>
                  {authData && authData._id === comment.user._id && (
                    <button onClick={() => handleDeleteComment(comment._id)} className={styles.deleteComment}>
                      <img src="./../images/icons/delete.svg" alt="delete" />
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
