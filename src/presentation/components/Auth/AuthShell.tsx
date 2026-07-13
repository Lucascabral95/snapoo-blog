import Image from "next/image";
import type { ReactNode } from "react";
import { BRAND_INFO } from "@/infrastructure/constants/navigation.constants";
import styles from "./AuthShell.module.scss";

const BRAND_PHOTOS = [
  "/img/city.jpg",
  "/img/bosque-blog.jpg",
  "/img/escalinata-blog.jpg",
  "/img/nieve-blog.jpg",
  "/img/montana-noche-blog.jpg",
  "/img/museo-blog.jpg",
];

interface AuthShellProps {
  brandTitle: string;
  brandSubtitle: string;
  children: ReactNode;
}

export default function AuthShell({ brandTitle, brandSubtitle, children }: AuthShellProps) {
  return (
    <div className={styles.auth}>
      <div className={styles.brand}>
        <div className={styles.brandPhotos}>
          {BRAND_PHOTOS.map((src) => (
            <div key={src} className={styles.brandPhotoCell}>
              <Image src={src} alt="" fill sizes="15vw" className={styles.brandPhoto} />
            </div>
          ))}
        </div>

        <div className={styles.brandContent}>
          <span className={styles.logo}>{BRAND_INFO.name}</span>
          <div>
            <h2 className={styles.brandTitle}>{brandTitle}</h2>
            <p className={styles.brandSub}>{brandSubtitle}</p>
          </div>
        </div>
      </div>

      <div className={styles.formSide}>
        <div className={styles.card}>{children}</div>
      </div>
    </div>
  );
}
