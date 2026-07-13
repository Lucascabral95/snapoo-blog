"use client";

import { useState } from "react";
import type { SearchCategory } from "@/infrastructure/types";
import { useSearchQuery } from "@/presentation/hooks/useSearchQuery";
import { useSearchPosts } from "@/presentation/hooks/useSearchPosts";
import SearchInput from "@/presentation/components/Search/SearchInput";
import SearchCategories from "@/presentation/components/Search/SearchCategories";
import SearchResults from "@/presentation/components/Search/SearchResults";
import SearchSkeleton from "@/presentation/components/Search/SearchSkeleton";
import styles from "@/presentation/components/Search/Search.module.scss";

export default function BuscarContent() {
  const { query } = useSearchQuery();
  const [category, setCategory] = useState<SearchCategory>("usuario");
  const { posts, isLoading } = useSearchPosts({ query, category });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <SearchInput />
        <SearchCategories selected={category} onChange={setCategory} />
      </div>

      {isLoading ? <SearchSkeleton /> : <SearchResults posts={posts} query={query} />}
    </div>
  );
}
