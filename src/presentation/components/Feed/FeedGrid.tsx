import type { FeedPost } from "@/infrastructure/types";

import styles from "./Feed.module.scss";
import FeedCard from "./FeedCard";

interface FeedGridProps {
  posts: FeedPost[];
}

export default function FeedGrid({ posts }: FeedGridProps) {
  if (posts.length === 0) {
    return (
      <div className={styles.emptyState}>
        <p className={styles.emptyMessage}>
          No hay publicaciones disponibles en este momento
        </p>
        <p className={styles.emptyHint}>
          ¡Sé el primero en compartir algo increíble!
        </p>
      </div>
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
