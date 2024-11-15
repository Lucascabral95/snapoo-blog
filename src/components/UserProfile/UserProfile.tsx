"use client";
import React, { useState } from "react";
import Image from "next/image";
import EstructuraImagenes from "../EstructuraImagenes/EstructuraImagenes";

interface UserProfileProps {
  dataPosteos: any[];
  datosDelUsuario: {
    userName: string;
  };
  rePosteos: any[];
  session: {
    user: {
      image: string;
    };
  };
}

const UserProfile: React.FC<UserProfileProps> = ({
  dataPosteos,
  datosDelUsuario,
  rePosteos,
  session,
}) => {
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("posteos");

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

export default UserProfile;
