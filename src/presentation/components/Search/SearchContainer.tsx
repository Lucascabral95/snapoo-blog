"use client";

import { useState } from "react";
import type { SearchCategory } from "@/infrastructure/types";
import SearchBar from "./SearchBar";
import SearchCategories from "./SearchCategories";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import { useSearchPosts } from "@/presentation/hooks/useSearchPosts";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";

export default function SearchContainer() {
  const [input, setInput] = useState<string>("");
  const [category, setCategory] = useState<SearchCategory>("usuario");

  const debouncedQuery = useDebounce(input, 500);
  const { posts } = useSearchPosts({
    query: debouncedQuery,
    category,
  });

  return (
    <div className="seccion-perfil seccion-perfil-inicio">
      <div className="busqueda">
        <div className="contenedor-de-busqueda">
          <SearchBar value={input} onChange={setInput} placeholder="Buscar" />

          <SearchCategories selected={category} onChange={setCategory} />
        </div>
      </div>

      <EstructuraImagenes posteos={posts} />
    </div>
  );
}
