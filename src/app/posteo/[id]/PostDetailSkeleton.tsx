import Skeleton from "react-loading-skeleton";
import styles from "./VistaImagen.module.scss";

export default function PostDetailSkeleton() {
  return (
    <div className={styles.postLayout}>
      <div className={styles.imageSide}>
        <Skeleton width="90%" height="80%" />
      </div>
      <div className={styles.side}>
        <div className={styles.sideHeader}>
          <Skeleton circle width={40} height={40} />
          <Skeleton width={120} height={14} />
        </div>
        <div className={styles.sideBody}>
          <Skeleton width="100%" height={12} style={{ marginBottom: 8 }} />
          <Skeleton width="80%" height={12} />
        </div>
      </div>
    </div>
  );
}
