"use client";
import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useSession } from "next-auth/react";
import Avvvatars from "avvvatars-react";

import EstructuraImagenes from "@/presentation/components/SecondaryComponents/Gallery/EstructuraImagenes";
import SubidaImagenes from "@/presentation/components/SubidaImagenes/SubidaImagenes";

interface UserProfileProps {
  dataPosteos: any[];
  datosDelUsuario: any;
  rePosteos: any[];
}

interface IUser {
  user: {
    id: string;
    name?: string;
    email?: string;
    image?: string;
    userName: string;
  };
}

type Section = "posteos" | "compartidos";

const SECTIONS = {
  POSTEOS: "posteos" as Section,
  COMPARTIDOS: "compartidos" as Section,
};

const AVATAR_SIZES = {
  LARGE: 140,
  MEDIUM: 85,
  SMALL: 74,
};

const TIME_RELOAD = 800;

export default function UserProfile({
  dataPosteos: initialPosteos,
  datosDelUsuario,
  rePosteos: initialRePosteos,
}: UserProfileProps) {
  const { data: sesion } = useSession() as { data: IUser | null };
  const [seccionSeleccionada, setSeccionSeleccionada] = useState<Section>(
    SECTIONS.POSTEOS
  );
  const [isOpenSubida, setIsOpenSubida] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [comentario, setComentario] = useState("");
  const [posteos, setPosteos] = useState(initialPosteos);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    setPosteos(initialPosteos);
  }, [initialPosteos]);

  const isOwnProfile = sesion?.user?.userName === datosDelUsuario;
  const displayName = datosDelUsuario ?? "Invitado";
  const posteosActuales =
    seccionSeleccionada === SECTIONS.POSTEOS ? posteos : initialRePosteos;

  const getTabStyles = (section: Section) => ({
    color: seccionSeleccionada === section ? "black" : "#c0c0c0",
    borderTop:
      seccionSeleccionada === section
        ? "0.5px solid black"
        : "0.5px solid #c0c0c05a",
  });

  const enviarImagen = useCallback(async () => {
    if (!file || !sesion?.user?.id) {
      toast.error("Faltan datos requeridos");
      return;
    }

    setIsUploading(true);
    const form = new FormData();
    form.append("file", file);
    form.append("comentario", comentario);
    form.append("id", sesion.user.id);

    try {
      const result = await axios.post("/api/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200 || result.status === 201) {
        setTimeout(() => {
          window.location.reload();
        }, TIME_RELOAD);

        setIsOpenSubida(false);
        setFile(undefined);
        setComentario("");
        toast.success("Imagen subida con éxito");
      }
    } catch (error) {
      console.error("Error al subir imagen:", error);
      toast.error("Error al subir la imagen. Intenta nuevamente.");
    } finally {
      setIsUploading(false);
    }
  }, [file, comentario, sesion]);

  const handleCloseModal = useCallback(() => {
    if (!isUploading) {
      setIsOpenSubida(false);
      setFile(undefined);
      setComentario("");
    }
  }, [isUploading]);

  return (
    <div className="seccion-perfil">
      {isOwnProfile && (
        <Link href="/feed/ajustes" className="editar">
          <button>EDITAR</button>
        </Link>
      )}

      <div className="imagen-nombre-perfil">
        <div className="imagen-de-perfil">
          <div className="foto-grande">
            <Avvvatars
              value={displayName}
              size={AVATAR_SIZES.LARGE}
              style="shape"
            />
          </div>
          <div className="foto-mediana">
            <Avvvatars
              value={displayName}
              size={AVATAR_SIZES.MEDIUM}
              style="shape"
            />
          </div>
          <div className="foto-chica">
            <Avvvatars
              value={displayName}
              size={AVATAR_SIZES.SMALL}
              style="shape"
            />
          </div>
        </div>

        <div className="titulo-username">
          <h2>{displayName}</h2>
        </div>
      </div>

      <div className="posteos-reposteos">
        <div className="pr">
          <div className="p">
            <div
              className="posteos"
              style={getTabStyles(SECTIONS.POSTEOS)}
              onClick={() => setSeccionSeleccionada(SECTIONS.POSTEOS)}
            >
              <p>POSTEOS</p>
            </div>
            <div
              className="posteos"
              style={getTabStyles(SECTIONS.COMPARTIDOS)}
              onClick={() => setSeccionSeleccionada(SECTIONS.COMPARTIDOS)}
            >
              <p>COMPARTIDOS</p>
            </div>
          </div>

          {isOwnProfile && (
            <div className="subida-imagenes">
              <div className="icono">
                <GoPlus
                  className="icon"
                  onClick={() => setIsOpenSubida(true)}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <Toaster position="top-center" />

      {isOpenSubida && (
        <SubidaImagenes
          setIsOpenSubida={handleCloseModal}
          publicarImagen={enviarImagen}
          setFile={setFile}
          setComentario={setComentario}
          isUploading={isUploading}
        />
      )}

      <EstructuraImagenes posteos={posteosActuales} />
    </div>
  );
}
