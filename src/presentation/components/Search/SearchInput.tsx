"use client";

import { useState, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useSearchQuery } from "@/presentation/hooks/useSearchQuery";
import { useDebounce } from "@/presentation/hooks/useDebounce";

import styles from "./Search.module.scss";

export default function SearchInput() {
  const { query, setQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 500);

  // Sincronizar debounced value con URL
  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  // Sincronizar input con query de URL (para navegación back/forward)
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  const handleClear = () => {
    setInputValue("");
    setQuery("");
  };

  return (
    <div className={styles.searchInput}>
      <FaSearch className={styles.searchIcon} />
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Buscar publicaciones, usuarios..."
        className={styles.input}
        autoComplete="off"
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          aria-label="Limpiar búsqueda"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
}
