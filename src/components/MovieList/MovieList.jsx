import styles from "./MovieList.module.css";
import { Link } from "react-router-dom";

const MovieList = ({ movies = [] }) => {
  if (!movies.length) {
    return <p>No movies found. Please try again.</p>;
  }

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title }) => (
        <li key={id}>
          <Link to={`/movies/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
};
export default MovieList;
