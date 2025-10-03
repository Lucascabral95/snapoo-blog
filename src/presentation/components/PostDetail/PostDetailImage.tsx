import Image from "next/image";

import styles from "./PostDetail.module.scss";

interface PostDetailImageProps {
  url: string;
  descripcion: string;
}

export default function PostDetailImage({
  url,
  descripcion,
}: PostDetailImageProps) {
  return (
    <div className={styles.imageContainer}>
      <Image
        src={url}
        alt={descripcion || "Imagen del post"}
        width={800}
        height={600}
        className={styles.image}
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
      />
    </div>
  );
}
