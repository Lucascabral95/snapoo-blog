import Skeleton from "react-loading-skeleton";
import styles from "./FeedSkeleton.module.scss";

const HEIGHTS = [220, 300, 260, 340, 240, 280, 320, 260, 300];

export default function FeedSkeleton() {
  return (
    <div className={styles.grid}>
      {HEIGHTS.map((height, index) => (
        <div key={index} className={styles.card}>
          <Skeleton height={height} />
        </div>
      ))}
    </div>
  );
}
