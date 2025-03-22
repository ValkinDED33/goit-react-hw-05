import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query")?.trim() || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query);
        setMovies(data.results || []);
      } catch (err) {
        console.error("Search error:", err);
        setError("Failed to fetch movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();
    setError(null);
    const inputQuery = e.target.elements.query.value.trim();

    if (!inputQuery) {
      setError("Please enter a search term and try again.");
      return;
    }

    setSearchParams({ query: inputQuery });
  };

  return (
    <div className={styles.movies}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          name="query"
          placeholder="Enter movie title..."
          defaultValue={query}
        />
        <button type="submit" disabled={loading}>
          Search
        </button>
      </form>

      {error && <p className={styles.error}>{error}</p>}
      {loading && <div className={styles.loader}></div>}

      {!loading && query && movies.length === 0 && <p>No results found</p>}

      {!loading && movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
