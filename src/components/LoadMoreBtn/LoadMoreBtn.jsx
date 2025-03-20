import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <div className={styles.loadMoreContainer}>
      <button className={styles.button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
