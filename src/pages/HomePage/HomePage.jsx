import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1>Trending Movies</h1>
      <MovieList />
    </div>
  );
};

export default HomePage;
