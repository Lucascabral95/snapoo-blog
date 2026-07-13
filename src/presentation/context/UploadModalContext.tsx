"use client";

import { createContext, useCallback, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

interface UploadModalContextValue {
  isOpen: boolean;
  isUploading: boolean;
  openUploadModal: () => void;
  closeUploadModal: () => void;
  setFile: Dispatch<SetStateAction<File | undefined>>;
  setComentario: Dispatch<SetStateAction<string>>;
  publicarImagen: () => Promise<void>;
}

const UploadModalContext = createContext<UploadModalContextValue | null>(null);

const TIME_RELOAD = 800;

export function UploadModalProvider({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [comentario, setComentario] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const openUploadModal = useCallback(() => setIsOpen(true), []);

  const closeUploadModal = useCallback(() => {
    setIsOpen(false);
    setFile(undefined);
    setComentario("");
  }, []);

  const publicarImagen = useCallback(async () => {
    if (!file || !session?.user?.id) {
      toast.error("Faltan datos requeridos");
      return;
    }

    setIsUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("comentario", comentario);
    form.append("id", session.user.id);

    try {
      const result = await axios.post("/api/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (result.status === 200 || result.status === 201) {
        toast.success("Imagen subida con éxito");
        setIsOpen(false);
        setFile(undefined);
        setComentario("");
        setTimeout(() => window.location.reload(), TIME_RELOAD);
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast.error("Error al subir la imagen. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  }, [file, comentario, session]);

  return (
    <UploadModalContext.Provider
      value={{ isOpen, isUploading, openUploadModal, closeUploadModal, setFile, setComentario, publicarImagen }}
    >
      {children}
    </UploadModalContext.Provider>
  );
}

export function useUploadModal() {
  const context = useContext(UploadModalContext);
  if (!context) {
    throw new Error("useUploadModal debe usarse dentro de UploadModalProvider");
  }
  return context;
}
