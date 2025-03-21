import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTrendingMovies } from "../../api";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies();

        if (!data || !data.results) {
          throw new Error("Invalid API response");
        }

        setMovies(data.results);
        setError(null);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setError("Failed to load trending movies. Please try again.");
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>

      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
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
    </div>
  );
};

export default HomePage;
