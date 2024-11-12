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
  const [sinData, setSinData] = useState<boolean>(false);

  useEffect(() => {
    const obtenerImagenes = async () => {
      try {
        const results = await axios.get(`/api/posteos`);

        if (results.status === 200 || results.status === 201) {
          const posteosFiltrados = results.data.result.filter(
            (posteo: any) => posteo.usuario.userName === username
          );
          setDataPosteos(posteosFiltrados);

          console.log(results.data.result[0].usuario);
          setDatosDelUsuario(results.data.result[0].usuario);
        }
      } catch (error) {
        console.log(`Se produjo un error en el servidor: ${error}`);
      }
    };

    obtenerImagenes();
  }, [username]);

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

      <EstructuraImagenes posteos={dataPosteos} sinData={sinData} />
    </div>
  );
};

export default PerfilUsuario;
