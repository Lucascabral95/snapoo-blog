import { Search } from "lucide-react";
import type { FeedPost } from "@/infrastructure/types";
import FeedGrid from "@/presentation/components/Feed/FeedGrid";
import StateBlock from "@/presentation/components/UI/StateBlock";

import styles from "./Search.module.scss";

interface SearchResultsProps {
  posts: FeedPost[];
  query: string;
}

export default function SearchResults({ posts, query }: SearchResultsProps) {
  if (!query || query.trim() === "") {
    return (
      <StateBlock
        icon={<Search size={22} />}
        title="Buscá fotos, personas o intereses"
        description="Ingresá un término para empezar a explorar."
      />
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <p className={styles.resultsCount}>
        {posts.length} {posts.length === 1 ? "resultado" : "resultados"} para &ldquo;{query}&rdquo;
      </p>
      <FeedGrid posts={posts} />
    </div>
  );
}
