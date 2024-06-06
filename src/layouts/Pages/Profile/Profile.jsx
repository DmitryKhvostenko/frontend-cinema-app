import { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Movies from 'backend/Movies.json';
import AvatarComponent from 'components/Avatar/AvatarComponent';
import PopUpProfile from 'components/PopUpProfile/PopUpProfile';

import { selectIsAuth } from '../../../redux/slices/auth';
import { commentsByUserId, deleteComment } from '../../../redux/slices/comments';

import styles from './Profile.module.scss';

const Profile = ({ t }) => {
  const dispatch = useDispatch();
  const firstCommentsVersion = useSelector((state) => state.comments.comments);
  const [userComments, setUserComments] = useState([]);
  const authData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const [isPopup, setIsPopup] = useState(false);
  const MemoizedNavLink = memo(NavLink);
  useEffect(() => {
    if (firstCommentsVersion) {
      const updatedComments = firstCommentsVersion.map((comment) => {
        const movie = Movies.find((movie) => movie.ImdbId === comment.filmId);
        console.log({ ...comment, commentUrl: movie ? movie.poster_url : null });
        return { ...comment, commentUrl: movie ? movie.poster_url : null };
      });
      setUserComments(updatedComments);
    }
  }, [firstCommentsVersion]);
  useEffect(() => {
    authData && dispatch(commentsByUserId(authData._id));
  }, [authData]);
  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment(commentId));
    dispatch(commentsByUserId(authData._id));
  };
  useEffect(() => {
    if (!isAuth & !window.localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t('profile.profile')}</h1>
          <div className={styles.mainInfo}>
            <AvatarComponent className={styles.image} />
            <div className={styles.data}>
              <h2 className={styles.name}>{authData ? authData.login : ''}</h2>
              <div className={styles.registration}>
                {t('profile.registered')}: {authData ? authData.createdAt : ''}
              </div>
            </div>
            <div className={styles.buttons}>
              <button
                onClick={() => {
                  setIsPopup(true);
                }}
                className={styles.edit}
              >
                {t('profile.editButton')}
              </button>
            </div>
          </div>
          <div className={styles.comments}>
            <div className={styles.commentsTitle}>{t('profile.comments')}</div>
            <div className={styles.commentsList}>
              {userComments.length > 0 ? (
                userComments.map((comment, index) => (
                  <div className={styles.comment} key={index}>
                    <MemoizedNavLink to={`/movie/${comment.filmId}`}>
                      <img src={comment.commentUrl} className={styles.commentImage} alt="comment image" />
                    </MemoizedNavLink>
                    <div className={styles.commentInfo}>
                      <div className={styles.commentTitle}>
                        <MemoizedNavLink to={`/movie/${comment.filmId}`}>{comment.user.login}</MemoizedNavLink>
                        <div className={styles.commentBorder}>|</div>
                        <span>{comment.createdAt}</span>
                      </div>
                      <div className={styles.commentWrapperText}>
                        {comment.rating && (
                          <div>
                            {comment.rating} <img src="./images/AppRating/full-rating.svg" alt="rating star" />
                          </div>
                        )}
                        <div className={styles.commentText}>{comment.text}</div>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteComment(comment._id)} className={styles.commentButton}>
                      <img src="./images/icons/delete.svg" alt="delete" />
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.emptyComments}>{t('profile.no comments')}</div>
              )}
            </div>
          </div>
        </div>
      </div>
      <PopUpProfile isOpen={isPopup} onClose={() => setIsPopup(false)} />
    </>
  );
};

export default Profile;
