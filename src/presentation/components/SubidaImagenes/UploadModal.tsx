"use client";

import { useUploadModal } from "@/presentation/context/UploadModalContext";
import SubidaImagenes from "./SubidaImagenes";

export default function UploadModal() {
  const { isOpen, isUploading, closeUploadModal, publicarImagen, setFile, setComentario } = useUploadModal();

  if (!isOpen) return null;

  return (
    <SubidaImagenes
      setIsOpenSubida={closeUploadModal}
      publicarImagen={publicarImagen}
      setFile={setFile}
      setComentario={setComentario}
      isUploading={isUploading}
    />
  );
}
