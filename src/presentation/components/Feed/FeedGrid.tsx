import { SearchX } from "lucide-react";
import type { FeedPost } from "@/infrastructure/types";

import styles from "./Feed.module.scss";
import FeedCard from "./FeedCard";
import StateBlock from "@/presentation/components/UI/StateBlock";

interface FeedGridProps {
  posts: FeedPost[];
}

export default function FeedGrid({ posts }: FeedGridProps) {
  if (posts.length === 0) {
    return (
      <StateBlock
        icon={<SearchX size={22} />}
        title="No se encontraron resultados"
        description="Probá con otro término de búsqueda o categoría."
      />
    );
  }

  return (
    <div className={styles.feedGrid}>
      {posts.map((post) => (
        <FeedCard key={post._id} post={post} />
      ))}
    </div>
  );
}
