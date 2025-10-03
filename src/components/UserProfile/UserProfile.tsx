"use client";
import React, { useState } from "react";
import EstructuraImagenes from "../EstructuraImagenes/EstructuraImagenes";
import axios from "axios";
import Link from "next/link";
import SubidaImagenes from "../SubidaImagenes/SubidaImagenes";
import toast, { Toaster } from "react-hot-toast";
import { GoPlus } from "react-icons/go";
import { useSession } from "next-auth/react";
import Avvvatars from "avvvatars-react";

interface UserProfileProps {
  dataPosteos: any[] | [];
  datosDelUsuario: any;
  rePosteos: any[] | [];
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

const UserProfile: React.FC<UserProfileProps> = ({
  dataPosteos,
  datosDelUsuario,
  rePosteos,
}) => {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("posteos");
  const [isOpenSubida, setIsOpenSubida] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [comentario, setComentario] = useState<string>("");
  const { data: sesion } = useSession() as { data: IUser | null };

  const enviarImagen = async () => {
    const form = new FormData();
    form.append("file", file!);
    form.append("comentario", comentario);
    form.append("id", sesion!.user!.id);

    try {
      const result = await axios.post("/api/upload", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (result.status === 200 || result.status === 201) {
        setIsOpenSubida(false);
        toast.success("Imagen subida con éxito");
      }
    } catch (error) {
      console.log(`Se produjo un error en el servidor: ${error}`);
    }
  };

  return (
    <div className="seccion-perfil">
      {sesion?.user?.userName === datosDelUsuario && (
        <Link href="/feed/ajustes" className="editar">
          <button> EDITAR </button>
        </Link>
      )}
      <div className="imagen-nombre-perfil">
        <div className="imagen-de-perfil">
          <div className="foto-grande">
            <Avvvatars
              value={datosDelUsuario ?? "Invitado"}
              size={140}
              style="shape"
            />
          </div>
          <div className="foto-mediana">
            <Avvvatars
              value={datosDelUsuario ?? "Invitado"}
              size={85}
              style="shape"
            />
          </div>
          <div className="foto-chica">
            <Avvvatars
              value={datosDelUsuario ?? "Invitado"}
              size={74}
              style="shape"
            />
          </div>
        </div>

        <div className="titulo-username">
          <h2> {datosDelUsuario ?? "Invitado"} </h2>
        </div>
      </div>
      <div className="posteos-reposteos">
        <div className="pr">
          <div className="p">
            <div
              className="posteos"
              style={{
                color: seccionSeleccionada === "posteos" ? "black" : "#c0c0c0",
                borderTop:
                  seccionSeleccionada === "posteos"
                    ? "0.5px solid black"
                    : "0.5px solid #c0c0c05a",
              }}
              onClick={() => setSeccionSeleccionada("posteos")}
            >
              <p> POSTEOS </p>
            </div>
            <div
              className="posteos"
              style={{
                color:
                  seccionSeleccionada === "compartidos" ? "black" : "#c0c0c0",
                borderTop:
                  seccionSeleccionada === "compartidos"
                    ? "0.5px solid black"
                    : "0.5px solid #c0c0c05a",
              }}
              onClick={() => setSeccionSeleccionada("compartidos")}
            >
              <p> COMPARTIDOS </p>
            </div>
          </div>
          {sesion?.user?.userName === datosDelUsuario && (
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

      <Toaster />

      {isOpenSubida && (
        <SubidaImagenes
          setIsOpenSubida={setIsOpenSubida}
          publicarImagen={enviarImagen}
          setFile={setFile}
          setComentario={setComentario}
        />
      )}

      {seccionSeleccionada === "posteos" ? (
        <EstructuraImagenes posteos={dataPosteos} />
      ) : (
        <EstructuraImagenes posteos={rePosteos} />
      )}
    </div>
  );
};

export default UserProfile;
