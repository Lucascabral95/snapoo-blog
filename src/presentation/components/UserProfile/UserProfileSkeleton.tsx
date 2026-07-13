import Skeleton from "react-loading-skeleton";
import styles from "./UserProfile.module.scss";
import gridStyles from "../SecondaryComponents/Gallery/EstructuraImagenes.module.scss";

export default function UserProfileSkeleton() {
  return (
    <div>
      <div className={styles.header}>
        <Skeleton circle width={100} height={100} />
        <div className={styles.info}>
          <Skeleton width={180} height={20} />
          <Skeleton width={260} height={14} style={{ marginTop: 10 }} />
        </div>
      </div>

      <div className={gridStyles.grid}>
        {Array.from({ length: 9 }).map((_, index) => (
          <div key={index} className={gridStyles.card}>
            <Skeleton height={200 + (index % 3) * 40} />
          </div>
        ))}
      </div>
    </div>
  );
}
