import axios from "axios";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "d46e753820a460585dba39f1250e0ca2";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data:",
      error.response?.data?.status_message || error.message
    );
    return null;
  }
};

export const getTrendingMovies = () =>
  fetchData(`${API_URL}/trending/movie/day?api_key=${API_KEY}`);

export const searchMovies = (query) =>
  fetchData(`${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`);

export const getMovieDetails = (movieId) =>
  fetchData(`${API_URL}/movie/${movieId}?api_key=${API_KEY}`);

export const getMovieCast = (movieId) =>
  fetchData(`${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`);

export const getMovieReviews = (movieId) =>
  fetchData(`${API_URL}/movie/${movieId}/reviews?api_key=${API_KEY}`);
