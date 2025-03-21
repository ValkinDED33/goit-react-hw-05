import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieCast } from "../../api";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCast(movieId).then(setCast);
  }, [movieId]);

  return (
    <ul className={styles.cast}>
      {cast.map((actor) => (
        <li key={actor.id}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
