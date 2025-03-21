import { useState } from "react";
import { Link } from "react-router-dom";
import { searchMovies } from "../../api";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log("Searching for:", query);

    if (!query.trim()) return;

    try {
      const data = await searchMovies(query);
      console.log("Fetched movies:", data.results);

      setMovies(data.results || []);
      setSearched(true);
      setError(null);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch movies. Please try again.");
    }
  };

  return (
    <div className={styles.movies}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter movie title..."
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className={styles.error}>{error}</p>}

      {searched && movies.length === 0 && <p>No results found</p>}

      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <Link
            to={`/movies/${movie.id}`}
            key={movie.id}
            className={styles.movieCard}
          >
            {movie.poster_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            ) : (
              <div className={styles.noImage}>No Image</div>
            )}
            <h3>{movie.title}</h3>
            <p>Rating: {movie.vote_average}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
