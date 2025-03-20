import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import { toast } from "react-hot-toast";
import styles from "./App.module.css";

const App = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [modalImage, setModalImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const fetchImages = useCallback(async (searchQuery, pageNumber) => {
    if (!searchQuery) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: { query: searchQuery, page: pageNumber, per_page: 12 },
          headers: {
            Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_KEY}`,
          },
        }
      );

      setImages((prev) =>
        pageNumber === 1
          ? response.data.results
          : [...prev, ...response.data.results]
      );
      setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error(
        "Error fetching images:",
        error.response?.data || error.message
      );
      setError("Failed to fetch images. Please try again later.");
      toast.error("Failed to fetch images.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages(query, page);
  }, [query, page, fetchImages]);

  const handleSearch = (newQuery) => {
    if (newQuery !== query) {
      setQuery(newQuery);
      setPage(1);
      setImages([]);
    }
  };

  const openModal = (image) => {
    setModalImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
  };

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <div className={styles.galleryContainer}>
        <ImageGallery images={images} onImageClick={openModal} />
      </div>
      {loading && <Loader />}
      {images.length > 0 && page < totalPages && !loading && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} />
      )}
      {modalImage && (
        <ImageModal
          isOpen={isModalOpen}
          image={modalImage}
          onRequestClose={closeModal}
        />
      )}
    </div>
  );
};

export default App;
