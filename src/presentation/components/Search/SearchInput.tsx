"use client";

import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { useSearchQuery } from "@/presentation/hooks/useSearchQuery";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import styles from "./Search.module.scss";

export default function SearchInput() {
  const { query, setQuery } = useSearchQuery();
  const [inputValue, setInputValue] = useState(query);
  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    setQuery(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  useEffect(() => {
    setInputValue(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const handleClear = () => {
    setInputValue("");
    setQuery("");
  };

  return (
    <div className={styles.searchInput}>
      <Search size={14} className={styles.searchIcon} />
      <input
        type="text"
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
        placeholder="Buscar publicaciones, usuarios..."
        className={styles.input}
        autoComplete="off"
      />
      {inputValue && (
        <button type="button" onClick={handleClear} className={styles.clearButton} aria-label="Limpiar búsqueda">
          <X size={14} />
        </button>
      )}
    </div>
  );
}
