import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../../api";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim()) {
      setError("Please enter a search term and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query);
      setMovies(data.results || []);
      setSearched(true);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch movies. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.movies}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <div className={styles.loader}></div>}

      {!loading && searched && movies.length === 0 && <p>No results found</p>}

      <div className={styles.movieGrid}>
        {!loading &&
          movies.map((movie) => (
            <Link
              key={movie.id}
              to={`/movies/${movie.id}`}
              className={styles.movieCard}
            >
              <h3>{movie.title}</h3>
              <p>Rating: {movie.vote_average}</p>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className={styles.noImage}>No image available</div>
              )}
            </Link>
          ))}
      </div>
    </div>
  );
};

export default MoviesPage;
