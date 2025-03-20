import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Останавливаем стандартное поведение формы
      if (query.trim() === "") {
        toast.error("Please enter a search query."); // Ошибка при пустом запросе
      } else {
        onSubmit(query);
        setQuery(""); // Очищаем поле ввода
      }
    }
  };

  return (
    <header className={styles.header}>
      <form className={styles.form}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown} // Теперь ошибка срабатывает точно
          className={styles.input}
        />
      </form>
    </header>
  );
};

export default SearchBar;
