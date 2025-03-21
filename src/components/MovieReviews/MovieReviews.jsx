import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMovieReviews } from "../../api";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);

  return (
    <ul className={styles.reviews}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p>— {review.author}</p>
          </li>
        ))
      ) : (
        <p>No reviews found</p>
      )}
    </ul>
  );
};

export default MovieReviews;
