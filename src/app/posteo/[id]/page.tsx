"use client";
import { useParams } from "next/navigation";

import { usePostDetail } from "@/presentation/hooks/usePostDetail";
import { getDisplayUsername } from "@/infrastructure/services/post.service";
import VistaImagen from "./VistaImagen";
import NotFoundComponent from "@/presentation/components/UI/NotFound";
import EstructuraConDashboard from "@/presentation/components/SecondaryComponents/EstructuraConDashboard/EstructuraConDashboard";

export default function PostDetailContainer() {
  const { id } = useParams<{ id: string }>();
  const { post, isLoading, error } = usePostDetail(id);

  if (error) {
    return (
      <EstructuraConDashboard>
        <NotFoundComponent contenido="Posteo no encontrado" />
      </EstructuraConDashboard>
    );
  }

  const displayUsername = post ? getDisplayUsername(post) : "";

  return (
    <VistaImagen
      id={post?._id || ""}
      url={post?.imagen || ""}
      likes={post?.likes || 0}
      descripcion={post?.descripcion || ""}
      fecha={post?.fecha || ""}
      usuario={displayUsername}
      username={post?.usuario?.userName || ""}
      loadingSkeleton={isLoading}
    />
  );
}
