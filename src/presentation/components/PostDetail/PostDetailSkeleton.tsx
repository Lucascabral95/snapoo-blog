import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import styles from "./PostDetail.module.scss";

export default function PostDetailSkeleton() {
  return (
    <div className={styles.postDetail}>
      <div className={styles.header}>
        <Skeleton circle width={48} height={48} />
        <div className={styles.userInfo}>
          <Skeleton width={120} height={20} />
          <Skeleton width={80} height={16} />
        </div>
      </div>

      <Skeleton height={500} className={styles.imageSkeleton} />

      <div className={styles.info}>
        <Skeleton width={60} height={24} />
        <Skeleton width="100%" height={16} count={2} />
      </div>

      <div className={styles.actions}>
        <Skeleton width={80} height={32} />
        <Skeleton width={80} height={32} />
      </div>
    </div>
  );
}
