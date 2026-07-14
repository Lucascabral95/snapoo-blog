import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import Avvvatars from "avvvatars-react";
import type { FeedPost } from "@/infrastructure/types";

import styles from "./Feed.module.scss";
import { getDisplayUsername } from "@/infrastructure/services";

interface FeedCardProps {
  post: FeedPost;
}

export default function FeedCard({ post }: FeedCardProps) {
  const displayName = getDisplayUsername(post);

  return (
    <Link href={`/posteo/${post._id}`} className={styles.feedCard}>
      <div className={styles.imageWrapper}>
        <Image
          src={`/api/media/posts/${post._id}`}
          alt={post.descripcion || "Imagen del post"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.image}
          unoptimized
        />

        <div className={styles.overlay}>
          <div className={styles.stats}>
            <span>
              <Heart size={13} />
              {post.likes}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.cardInfo}>
        <Avvvatars value={displayName} size={20} />
        <p className={styles.author}>{displayName}</p>
      </div>
    </Link>
  );
}
