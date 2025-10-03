import type { FeedPost } from "@/infrastructure/types";
import FeedGrid from "@/presentation/components/Feed/FeedGrid";

import styles from "./Search.module.scss";

interface SearchResultsProps {
  posts: FeedPost[];
  query: string;
  category: string;
}

export default function SearchResults({
  posts,
  query,
  category,
}: SearchResultsProps) {
  if (!query || query.trim() === "") {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          Ingresa un término de búsqueda para comenzar
        </p>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          No se encontraron resultados para {query}
        </p>
        <p className={styles.emptyHint}>
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <div className={styles.resultsHeader}>
        <p className={styles.resultsCount}>
          {posts.length} {posts.length === 1 ? "resultado" : "resultados"} para
          {query}
        </p>
      </div>
      <FeedGrid posts={posts} />
    </div>
  );
}
