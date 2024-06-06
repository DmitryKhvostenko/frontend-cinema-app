import styles from './Placeholder.module.scss';

const Placeholder = ({ t }) => {
  return (
    <div className={styles.placeholder}>
      <div className={styles.container}>
        <h1 className={styles.title}>{t('placeholder.title')}!</h1>
        <div className={styles.text}>
          <p>{t('placeholder.text1')}! 🐾</p>
          <p>{t('placeholder.text2')}! 🐱</p>
          <p>{t('placeholder.text3')}:</p>
          <div className={styles.images}>
            <img src="https://live.staticflickr.com/1336/579761138_2384373a41_b.jpg" alt="Cat" />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyNdcKjMCcGizM1YuKoLwxxsCjzSsfI_XGeF2MwCIsSg&s"
              alt="Cat"
            />
            <img src="https://i.imgur.com/3j3rU.jpg" alt="Cat" />
            <img src="https://i.pinimg.com/564x/05/1f/42/051f42850d1beff69a92d94f40a6500e.jpg" alt="Cat" />
            <img src="https://i.pinimg.com/236x/c8/cc/24/c8cc24bba37a25c009647b8875aae0e3.jpg" alt="Cat" />
            <img
              src="https://preview.redd.it/cute-cats-v0-jtt0lyi4mpy81.jpg?width=882&format=pjpg&auto=webp&s=53691e230b9d2b3a8b339d6cf136240407721822"
              alt="Cat"
            />
          </div>
          <p>{t('placeholder.text4')}! 😉</p>
        </div>
      </div>
    </div>
  );
};

export default Placeholder;
