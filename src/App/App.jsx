import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "../components/Navigation/Navigation";
import styles from "../App/App.module.css";

const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <div className={styles.container}>
      {" "}
      {}
      <Navigation />
      <Suspense fallback={<div className={styles.loader}>Loading...</div>}>
        {" "}
        {}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route
              path="cast"
              element={
                <Suspense
                  fallback={
                    <div className={styles.loader}>Loading cast...</div>
                  }
                >
                  <MovieCast />
                </Suspense>
              }
            />
            <Route
              path="reviews"
              element={
                <Suspense
                  fallback={
                    <div className={styles.loader}>Loading reviews...</div>
                  }
                >
                  <MovieReviews />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
