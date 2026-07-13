import Skeleton from "react-loading-skeleton";
import styles from "./Search.module.scss";

export default function SearchSkeleton() {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Skeleton key={index} height={220} borderRadius={10} />
      ))}
    </div>
  );
}
