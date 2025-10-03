import { FaHeart } from "react-icons/fa";

import styles from "./PostDetail.module.scss";

interface PostDetailInfoProps {
  descripcion: string;
  likes: number;
}

export default function PostDetailInfo({
  descripcion,
  likes,
}: PostDetailInfoProps) {
  return (
    <div className={styles.info}>
      <div className={styles.likes}>
        <FaHeart className={styles.likeIcon} />
        <span>{likes.toLocaleString()} me gusta</span>
      </div>
      {descripcion && <p className={styles.description}>{descripcion}</p>}
    </div>
  );
}
