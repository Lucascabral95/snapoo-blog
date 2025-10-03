import Link from "next/link";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import type { FeedPost } from "@/infrastructure/types";

import styles from "./Feed.module.scss";
import { getDisplayUsername } from "@/infrastructure/services";

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  const displayName = getDisplayUsername(post);

  return (
    <Link href={`/posteos/${post._id}`} className={styles.feedCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={post.imagen}
          alt={post.descripcion || "Imagen del post"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
        />

        <div className={styles.overlay}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <FaHeart />
              <span>{post.likes}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <p className={styles.author}>{displayName}</p>
        {post.descripcion && (
          <p className={styles.description}>
            {post.descripcion.slice(0, 60)}
            {post.descripcion.length > 60 && "..."}
          </p>
        )}
      </div>
    </Link>
  );
}
