import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);

        if (!data || !data.cast) {
          throw new Error("No cast data available");
        }

        setCast(data.cast);
      } catch (err) {
        console.error("Error fetching cast:", err);
        setError("Failed to load cast. Please try again.");
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <div className={styles.castGrid}>
        {cast.length > 0 ? (
          cast.map((actor) => (
            <div key={actor.id} className={styles.actorCard}>
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
            </div>
          ))
        ) : (
          <p>No cast information available</p>
        )}
      </div>
    </div>
  );
};

export default MovieCast;
