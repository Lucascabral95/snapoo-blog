"use client";

import type { SearchCategory } from "@/infrastructure/types";

interface SearchCategoriesProps {
  selected: SearchCategory;
  onChange: (category: SearchCategory) => void;
}

const CATEGORIES: Array<{ id: SearchCategory; label: string }> = [
  { id: "usuario", label: "Usuarios" },
  { id: "imagen", label: "Imagenes" },
];

export default function SearchCategories({
  selected,
  onChange,
}: SearchCategoriesProps) {
  return (
    <div className="busqueda-categorias">
      {CATEGORIES.map((cat) => (
        <div key={cat.id} className="cats" onClick={() => onChange(cat.id)}>
          <p>{cat.label}</p>
        </div>
      ))}
    </div>
  );
}
