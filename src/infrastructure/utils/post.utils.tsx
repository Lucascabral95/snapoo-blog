import type { Post, PostDetailProps } from "@/infrastructure/types";

export function transformPostToProps(post: Post): PostDetailProps {
  const displayName =
    post.usuario?.userName || post.usuario?.email || "Usuario anónimo";

  return {
    id: post._id,
    url: post.imagen,
    likes: post.likes,
    descripcion: post.descripcion,
    fecha: post.fecha,
    usuario: displayName,
    username: post.usuario?.userName || "",
    loadingSkeleton: false,
  };
}
