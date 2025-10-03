import Link from "next/link";
import Avvvatar from "avvvatars-react";

import styles from "./PostDetail.module.scss";
import { formatDistanceToNow } from "@/infrastructure/utils";

interface PostDetailHeaderProps {
  usuario: string;
  username: string;
  fecha: string;
}

export default function PostDetailHeader({
  usuario,
  username,
  fecha,
}: PostDetailHeaderProps) {
  const profileUrl = username ? `/usuario/perfil/${username}` : "#";
  const timeAgo = formatDistanceToNow(fecha);

  return (
    <header className={styles.header}>
      <Link href={profileUrl} className={styles.userLink}>
        <Avvvatar value={usuario} size={48} />
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>{usuario}</h2>
          {username && <span className={styles.userHandle}>@{username}</span>}
        </div>
      </Link>
      <time className={styles.timestamp} dateTime={fecha}>
        {timeAgo}
      </time>
    </header>
  );
}
