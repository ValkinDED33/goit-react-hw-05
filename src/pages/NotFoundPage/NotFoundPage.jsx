import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.notfound}>
      <h1>Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
};

export default NotFoundPage;
