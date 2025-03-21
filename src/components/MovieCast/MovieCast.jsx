import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      setError("Invalid movie ID.");
      setLoading(false);
      return;
    }

    const fetchCast = async () => {
      try {
        console.log("Fetching cast for movie ID:", movieId);
        const data = await getMovieCast(movieId);

        if (!data || !data.cast) {
          throw new Error("No cast data found.");
        }

        setCast(data.cast);
      } catch (err) {
        console.error("Error fetching cast:", err);
        setError("Failed to load cast. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p className={styles.loader}>Loading cast...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <div className={styles.castGrid}>
        {cast.length === 0 ? (
          <p>No cast information available.</p>
        ) : (
          cast.map((actor) => (
            <a
              key={actor.id}
              href={`https://www.themoviedb.org/person/${actor.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.actorCard}
            >
              {actor.profile_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                  alt={actor.name}
                />
              ) : (
                <div className={styles.noImage}>No Image</div>
              )}
              <h3>{actor.name}</h3>
              <p>Character: {actor.character}</p>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieCast;
