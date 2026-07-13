"use client";

import type { SearchCategory } from "@/infrastructure/types";
import Tabs from "@/presentation/components/UI/Tabs";

interface SearchCategoriesProps {
  selected: SearchCategory;
  onChange: (category: SearchCategory) => void;
}

const CATEGORIES: Array<{ key: SearchCategory; label: string }> = [
  { key: "usuario", label: "Usuarios" },
  { key: "imagen", label: "Imágenes" },
];

export default function SearchCategories({ selected, onChange }: SearchCategoriesProps) {
  return (
    <Tabs
      items={CATEGORIES.map((c) => ({ key: c.key, label: c.label }))}
      activeKey={selected}
      onChange={(key) => onChange(key as SearchCategory)}
    />
  );
}
