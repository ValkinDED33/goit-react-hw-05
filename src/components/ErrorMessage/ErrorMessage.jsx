import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ message }) => {
  return (
    <div className={styles.error}>
      {message || "Oops! Something went wrong. Please try again later!"}
    </div>
  );
};

export default ErrorMessage;
