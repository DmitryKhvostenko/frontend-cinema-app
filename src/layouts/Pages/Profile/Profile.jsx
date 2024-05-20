import { memo, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import Movies from 'backend/Movies.json';
import { useUser } from 'utils/UserProvider';
import AvatarComponent from 'components/Avatar/AvatarComponent';
import PopUpProfile from 'components/PopUpProfile/PopUpProfile';

import styles from './Profile.module.scss';

const Profile = ({ t }) => {
  const { currentUser } = useUser();
  const user = currentUser[Object.keys(currentUser)[0]];
  const [userComments, setUserComments] = useState([]);
  const comments = JSON.parse(localStorage.getItem('comments'));
  const [allComments, setAllComments] = useState(comments);
  const [isPopup, setIsPopup] = useState(false);
  const MemoizedNavLink = memo(NavLink);
  useEffect(() => {
    const userComments = comments.filter((comment) => comment.comments.some((c) => c.userId === user.id));
    const filmsInfoArray = [];
    userComments.forEach((comment) => {
      const movie = Movies.find((movie) => movie.ImdbId === comment.id);
      if (movie) {
        const userCommentsForMovie = comment.comments.filter((c) => c.userId === user.id);
        userCommentsForMovie.forEach((userComment) => {
          filmsInfoArray.push({
            ImdbId: movie.ImdbId,
            name: movie.name,
            image: movie.poster_url,
            text: userComment.text,
            commentId: userComment.commentId,
            time: userComment.time,
            grade: userComment.grade,
          });
        });
      }
    });
    setUserComments(filmsInfoArray);
  }, [allComments]);

  const deleteComment = (commentId) => {
    const updatedComments = comments.map((comment) => {
      if (comment.comments.some((c) => c.commentId === commentId)) {
        comment.comments = comment.comments.filter((c) => c.commentId !== commentId);
      }
      return comment;
    });
    localStorage.setItem('comments', JSON.stringify(updatedComments));
    setAllComments(updatedComments);
  };
  return (
    <>
      <div className={styles.profile}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>{t('profile.profile')}</h1>
          <div className={styles.mainInfo}>
            <AvatarComponent currentUser={user} className={styles.image} />
            <div className={styles.data}>
              <h2 className={styles.name}>{user.login}</h2>
              <div className={styles.registration}>
                {t('profile.registered')}: {user.regDate}
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
              {userComments.length ? (
                userComments.map((comment, index) => (
                  <div className={styles.comment} key={index}>
                    <MemoizedNavLink to={`/movie/${comment.ImdbId}`}>
                      <img src={comment.image} className={styles.commentImage} alt="user"></img>
                    </MemoizedNavLink>
                    <div className={styles.commentInfo}>
                      <div className={styles.commentTitle}>
                        <MemoizedNavLink to={`/movie/${comment.ImdbId}`}>{comment.name}</MemoizedNavLink>
                        <div className={styles.commentBorder}>|</div>
                        <span>{comment.time}</span>
                      </div>
                      <div className={styles.commentWrapperText}>
                        {comment.grade && (
                          <div>
                            {comment.grade} <img src="./images/AppRating/full-rating.svg" alt="rating star" />
                          </div>
                        )}
                        <div className={styles.commentText}>{comment.text}</div>
                      </div>
                    </div>
                    <button onClick={() => deleteComment(comment.commentId)} className={styles.commentButton}>
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
      <PopUpProfile isOpen={isPopup} onClose={() => setIsPopup(false)} currentUser={user} />
    </>
  );
};

export default Profile;
