import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaComment } from "react-icons/fa";
import type { FeedPost } from "@/infrastructure/types";
import { getDisplayName } from "@/infrastructure/services/post.service";

import styles from "./Feed.module.scss";

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  const displayName = getDisplayName(post);

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

        {/* Overlay con información */}
        <div className={styles.overlay}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <FaHeart />
              <span>{post.likes}</span>
            </div>
            {/* Opcional: agregar comentarios si tienes ese dato */}
          </div>
        </div>
      </div>

      {/* Información del post */}
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
