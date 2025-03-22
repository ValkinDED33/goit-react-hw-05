import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMovieDetails } from "../../api";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || "/");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setError(null);
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error("Error fetching movie details:", err);
        setError("Failed to load movie details. Please try again later.");
      }
    };

    fetchMovie();
  }, [movieId]);

  if (error) return <p className={styles.error}>{error}</p>;
  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.details}>
      {}
      <Link to={backLinkRef.current} className={styles.goBackButton}>
        ← Go Back
      </Link>

      <h1>{movie.title}</h1>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      ) : (
        <p>No poster available</p>
      )}
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

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
