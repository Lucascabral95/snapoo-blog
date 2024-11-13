"use client";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useSession } from "next-auth/react";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
    image: string;
  };
}

interface IUsuario {
  avatar?: string;
  email: string;
  userName: string;
  _id: string;
}

const PerfilUsuario = () => {
  const { username } = useParams<{ username: string }>();
  const { data: session } = useSession() as { data: User | null };
  const [dataPosteos, setDataPosteos] = useState<any[]>([]);
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("posteos");
  const [datosDelUsuario, setDatosDelUsuario] = useState<IUsuario>();
  const [rePosteos, setRePosteos] = useState<any[]>([]);

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const results = await axios.get(`/api/posteos`);

        if (results.status === 200 || results.status === 201) {
          const posteosFiltrados = results.data.result.filter(
            (posteo: any) => posteo.usuario.userName === username
          );
          setDataPosteos(posteosFiltrados.reverse());
          setDatosDelUsuario(results.data.result[0].usuario);
        }
      } catch (error) {
        console.log(`Se produjo un error en el servidor: ${error}`);
      }
    };

    obtenerImagenes();
  }, [username]);

  useEffect(() => {
    const obtenerReposteos = async () => {
      try {
        const results = await axios.get(`/api/intereses`);

        if (results.status === 200 || results.status === 201) {
          const busquedaUsuario = results.data.result.filter(
            (posteo: any) => posteo.user.userName === username
          );
          setRePosteos(busquedaUsuario[0].rePosteos.reverse());
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log(error.response.data.error);
          } else if (error.response.status === 500) {
            window.location.reload();
          } else {
            console.log(error.response.data.error);
          }
        }
      }
    };

    obtenerReposteos();
  }, []);

  return (
    <div className="seccion-perfil">
      <div className="imagen-nombre-perfil">
        <div className="imagen-de-perfil">
          <Image
            alt="Imagen de perfil"
            style={{ borderRadius: "50%" }}
            src={session?.user?.image ?? "/img/logo-snapoo.png"}
            width={140}
            className="img"
            height={140}
          />
        </div>

        <div className="titulo-username">
          <h2> {datosDelUsuario?.userName ?? "Invitado"} </h2>
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
        </div>
      </div>

      {seccionSeleccionada === "posteos" ? (
        <EstructuraImagenes posteos={dataPosteos} />
      ) : (
        <EstructuraImagenes posteos={rePosteos} />
      )}
    </div>
  );
};

export default PerfilUsuario;
