"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import "moment/locale/es";
import Skeleton from "react-loading-skeleton";
import Avvvatars from "avvvatars-react";
import { Heart, MessageCircle, Repeat, X } from "lucide-react";
import { useSession } from "next-auth/react";
import useVistaImagen from "@/presentation/hooks/useVistaImagen";
import { useComments } from "@/presentation/hooks";
import Button from "@/presentation/components/UI/Button";
import ModerationMenu from "@/presentation/components/Moderation/ModerationMenu";
import styles from "./VistaImagen.module.scss";

interface VistaImagenProps {
  url: string;
  descripcion: string;
  fecha: string;
  likes: number;
  usuario: string;
  id: string;
  username: string;
  loadingSkeleton: boolean;
}

export default function VistaImagen({
  id,
  url,
  descripcion,
  fecha,
  likes,
  usuario,
  username,
  loadingSkeleton,
}: VistaImagenProps) {
  const { repostear, darLike, likeCount, hasLiked, isReposting, isLiking } = useVistaImagen({ id, likes });
  const { comments, isPosting, addComment } = useComments(id);
  const { data: session } = useSession();
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = async (event: FormEvent) => {
    event.preventDefault();
    await addComment(commentText);
    setCommentText("");
  };

  return (
    <div className={styles.postLayout}>
      <div className={styles.imageSide}>
        <button type="button" className={styles.closeButton} onClick={() => window.history.back()} aria-label="Cerrar">
          <X size={18} />
        </button>
        {loadingSkeleton ? (
          <Skeleton width="100%" height={614} />
        ) : url ? (
          <Image src={id ? `/api/media/posts/${id}` : url} alt={descripcion || "Imagen del posteo"} width={900} height={1100} priority unoptimized />
        ) : null}
      </div>

      <div className={styles.side}>
        <div className={styles.sideHeader}>
          <Link href={`/usuario/perfil/${username}`}>
            <Avvvatars value={username || usuario} size={40} />
          </Link>
          <div>
            <Link href={`/usuario/perfil/${username}`} className={styles.authorName}>
              {usuario}
            </Link>
            {username && <div className={styles.authorHandle}>@{username}</div>}
          </div>
          <ModerationMenu targetType="post" targetId={id} />
        </div>

        <div className={styles.sideBody}>
          {descripcion && <p className={styles.description}>{descripcion}</p>}
          {fecha && <span className={styles.date}>{moment(fecha).fromNow()}</span>}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={[styles.actionButton, hasLiked && styles.liked].filter(Boolean).join(" ")}
            onClick={darLike}
            disabled={isLiking}
          >
            <Heart size={15} fill={hasLiked ? "currentColor" : "none"} />
            {likeCount.toLocaleString()}
          </button>

          <span className={styles.actionButton}>
            <MessageCircle size={15} />
            {comments.length}
          </span>

          <button
            type="button"
            className={styles.actionButton}
            onClick={repostear}
            disabled={isReposting}
          >
            <Repeat size={15} />
            Repostear
          </button>
        </div>

        <div className={styles.comments}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles.comment}>
              <Avvvatars value={comment.emisor} size={32} />
              <div>
                <span className={styles.commentUser}>{comment.emisor}</span>{" "}
                <span className={styles.commentText}>{comment.contenido}</span>
              </div>
              <ModerationMenu targetType="comment" targetId={comment._id} />
            </div>
          ))}
        </div>

        <form className={styles.commentInputRow} onSubmit={handleSubmitComment}>
          <Avvvatars value={session?.user?.userName ?? session?.user?.email ?? "Vos"} size={28} />
          <input
            className={styles.commentInput}
            placeholder="Agregá un comentario..."
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
            maxLength={1000}
          />
          <Button type="submit" size="sm" disabled={isPosting || !commentText.trim()}>
            Publicar
          </Button>
        </form>
      </div>
    </div>
  );
}
