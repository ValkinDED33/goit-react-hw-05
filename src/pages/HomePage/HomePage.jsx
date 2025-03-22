import { useState, useEffect } from "react";
import { getTrendingMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await getTrendingMovies();

        if (!data?.results) {
          throw new Error("Invalid API response");
        }

        setMovies(data.results);
      } catch (err) {
        console.error("Error fetching trending movies:", err);
        setError("Failed to load trending movies. Please try again.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>
      {loading && <div className={styles.loader}></div>} {}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && movies.length > 0 && <MovieList movies={movies} />}
      {!loading && !error && movies.length === 0 && (
        <p>No trending movies found.</p>
      )}
    </div>
  );
};

export default HomePage;
