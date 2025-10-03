"use client";

import { useState } from "react";
import { FaHeart, FaShare, FaBookmark } from "react-icons/fa";
import styles from "./PostDetail.module.scss";

interface PostDetailActionsProps {
  postId: string;
  likes: number;
}

export default function PostDetailActions({
  postId,
  likes,
}: PostDetailActionsProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    setIsLiked(!isLiked);
    setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
  };

  const handleSave = async () => {
    setIsSaved(!isSaved);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Post en Snapoo",
        url: window.location.href,
      });
    }
  };

  return (
    <div className={styles.actions}>
      <button
        onClick={handleLike}
        className={`${styles.actionButton} ${isLiked ? styles.active : ""}`}
        aria-label={isLiked ? "Quitar me gusta" : "Me gusta"}
      >
        <FaHeart />
        <span>Me gusta</span>
      </button>

      <button
        onClick={handleShare}
        className={styles.actionButton}
        aria-label="Compartir"
      >
        <FaShare />
        <span>Compartir</span>
      </button>

      <button
        onClick={handleSave}
        className={`${styles.actionButton} ${isSaved ? styles.active : ""}`}
        aria-label={isSaved ? "Quitar de guardados" : "Guardar"}
      >
        <FaBookmark />
        <span>Guardar</span>
      </button>
    </div>
  );
}
