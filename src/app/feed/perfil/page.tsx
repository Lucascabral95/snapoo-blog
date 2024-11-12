"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { GoPlus } from "react-icons/go";
import SubidaImagenes from "@/components/SubidaImagenes/SubidaImagenes";
import axios from "axios";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  saludo?: string;
}

interface TUser {
  _id: string;
  userName: string;
  email: string;
  avatar?: string;
}

const Login: React.FC = () => {
  const { data: session } = useSession() as { data: { user?: User } | null };
  const [seccionSeleccionada, setSeccionSeleccionada] =
    useState<string>("posteos");
  const [posteos, setPosteos] = useState<any[]>([]);
  const [isOpenSubida, setIsOpenSubida] = useState<boolean>(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [comentario, setComentario] = useState<string>("");
  const pathname = usePathname();
  const [misDatos, setMisDatos] = useState<TUser>();
  const [rePosteos, setRePosteos] = useState<any[]>([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true);

  const enviarImagen = async () => {
    const form = new FormData();
    form.append("file", file!);
    form.append("comentario", comentario);
    form.append("id", session!.user!.id);

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

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const results = await axios.get(`/api/posteos`);

        if (results.status === 200 || results.status === 201) {
          const posteosFiltrados = results.data.result.filter(
            (posteo: any) => posteo.usuario._id === session?.user?.id
          );

          setPosteos(posteosFiltrados);
          setLoadingSkeleton(false);
        }
      } catch (error) {
        console.log(`Se produjo un error en el servidor: ${error}`);
      }
    };

    if (session?.user?.id) {
      obtenerImagenes();
    }
  }, [session, isOpenSubida]);

  useEffect(() => {
    const obtenerDatosPersonales = async () => {
      try {
        const results = await axios.get(`/api/register`);

        if (results.status === 200 || results.status === 201) {
          const filtroMio = results.data.result.filter(
            (posteo: any) => posteo._id === session?.user?.id
          );

          setMisDatos(filtroMio[0]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerDatosPersonales();
  }, [session]);

  useEffect(() => {
    const obtenerReposteos = async () => {
      try {
        const results = await axios.get(`/api/intereses`);

        if (results.status === 200 || results.status === 201) {
          const misCompartidos = results.data.result.filter(
            (posteo: any) => posteo.user._id === session?.user?.id
          );
          setRePosteos(misCompartidos[0].rePosteos);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log(error.response.data.error);
          } else {
            console.log(error.response.data.error);
          }
        }
      }
    };

    obtenerReposteos();
  }, [session]);

  const [sinData, setSinData] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (posteos.length === 0 && rePosteos.length === 0) {
        setSinData(true);
      }
    }, 800);
  
    return () => clearTimeout(timer);
  }, [session, posteos, rePosteos]);

  return (
    <div className="seccion-perfil">
      {pathname === "/feed/perfil" && (
        <Link href="/feed/ajustes" className="editar">
          <button> EDITAR </button>
        </Link>
      )}
      <div className="imagen-nombre-perfil">
        <div className="imagen-de-perfil">
          <Image
            style={{ borderRadius: "50%" }}
            className="img"
            src={session?.user?.image ?? "/img/logo-snapoo.png"}
            alt="Logo"
            width="140"
            height="140"
          />
        </div>
        <div className="titulo-username">
          {loadingSkeleton ? (
            <Skeleton
              className="font-username"
              count={1}
              width={200}
              height={36}
            />
          ) : (
            <h2 className="font-username">
              {misDatos?.userName ?? "Invitado"}
            </h2>
          )}
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
          {pathname === "/feed/perfil" && (
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

      {isOpenSubida && (
        <SubidaImagenes
          setIsOpenSubida={setIsOpenSubida}
          publicarImagen={enviarImagen}
          setFile={setFile}
          setComentario={setComentario}
        />
      )}

      {seccionSeleccionada === "posteos" ? (
        <EstructuraImagenes posteos={posteos} sinData={sinData} />
      ) : (
        <EstructuraImagenes posteos={rePosteos} sinData={sinData} />
      )}
    </div>
  );
};

export default Login;