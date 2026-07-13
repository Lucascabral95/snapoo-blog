import Image from "next/image";
import styles from "./Avatar.module.scss";

interface AvatarProps {
  src: string;
  alt: string;
  size?: 24 | 28 | 32 | 34 | 40 | 56 | 100;
  onClick?: () => void;
  className?: string;
}

export default function Avatar({ src, alt, size = 40, onClick, className }: AvatarProps) {
  return (
    <Image
      className={[styles.avatar, className].filter(Boolean).join(" ")}
      src={src}
      alt={alt}
      width={size}
      height={size}
      onClick={onClick}
    />
  );
}
