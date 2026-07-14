"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Heart, ImageOff } from "lucide-react";
import Avvvatars from "avvvatars-react";

import type { GalleryPost } from "@/infrastructure/types/gallery.types";
import Button from "@/presentation/components/UI/Button";
import StateBlock from "@/presentation/components/UI/StateBlock";
import styles from "./EstructuraImagenes.module.scss";

interface EstructuraImagenesProps {
  posteos: GalleryPost[];
}

const IMAGES_PER_PAGE = 30;

export default function EstructuraImagenes({ posteos }: EstructuraImagenesProps) {
  const pathName = usePathname();
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const posteosVisibles = posteos.slice(0, visibleCount);
  const hayMasPosteos = visibleCount < posteos.length;
  const shouldShowUserInfo = pathName === "/feed/people";

  const getDisplayName = (post: GalleryPost) =>
    post.usuario?.userName !== "" ? post.usuario?.userName : post.usuario?.email;

  if (posteos.length === 0) {
    return (
      <StateBlock
        icon={<ImageOff size={22} />}
        title="Todavía no hay publicaciones"
        description="Cuando se compartan fotos acá, vas a poder verlas."
      />
    );
  }

  return (
    <div className={styles.grid}>
      {posteosVisibles.map((item) => (
        <Link href={`/posteo/${item._id}`} key={item._id} className={styles.card}>
          <Image
            className={styles.image}
            loading="lazy"
            width={500}
            height={500}
            src={`/api/media/posts/${item._id}`}
            alt={item.descripcion || "Imagen del post"}
            unoptimized
          />

          <div className={styles.overlay}>
            {typeof item.likes === "number" && (
              <div className={styles.stats}>
                <span>
                  <Heart size={12} />
                  {item.likes}
                </span>
              </div>
            )}
          </div>

          {shouldShowUserInfo && item.usuario?.userName && (
            <div className={styles.author}>
              <Avvvatars value={getDisplayName(item) || "Snapoo"} size={24} />
              <span>{getDisplayName(item)}</span>
            </div>
          )}
        </Link>
      ))}

      {hayMasPosteos && (
        <div className={styles.more}>
          <Button variant="secondary" onClick={() => setVisibleCount((prev) => prev + IMAGES_PER_PAGE)}>
            Ver más
          </Button>
        </div>
      )}
    </div>
  );
}
