import { useParams, Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMovieDetails } from "../../api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.details}>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>

      {}
      <div className={styles.buttonContainer}>
        <Link to="cast" className={styles.button}>
          Cast
        </Link>
        <Link to="reviews" className={styles.button}>
          Reviews
        </Link>
      </div>

      {}
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
