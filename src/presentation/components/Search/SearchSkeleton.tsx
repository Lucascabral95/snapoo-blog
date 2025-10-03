import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./Search.module.scss";

export default function SearchSkeleton() {
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchHeader}>
        <Skeleton height={48} className="mb-4" />
        <Skeleton height={40} width={300} />
      </div>
      <div className={styles.skeletonGrid}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} height={300} />
        ))}
      </div>
    </div>
  );
}
