import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <div className={styles.movieGrid}>
      {" "}
      {}
      {movies.map((movie) => (
        <Link
          to={`/movies/${movie.id}`}
          state={{ from: location }}
          key={movie.id}
          className={styles.movieCard}
        >
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className={styles.noImage}>No Image</div>
          )}
          <h3>{movie.title}</h3>
          <p>Rating: {movie.vote_average.toFixed(1)}</p>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
