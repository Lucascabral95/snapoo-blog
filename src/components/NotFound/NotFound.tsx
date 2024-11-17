import React from "react";
import Image from "next/image";
import "@/app/App.scss";

interface Props {
  contenido: string;
}

const NotFoundComponent: React.FC<Props> = ({ contenido }) => {
  return (
    <div className="not-found">
      <div className="contenedor-not-found">
        <div className="titulo-de-pagina">
          <h2> {contenido} </h2>
        </div>
        <div className="imagen-de-pagina">
          <Image
            className="img"
            src="/img/bad-request.jpg"
            alt="Logo"
            width="380"
            height="230"
          />
        </div>
      </div>
    </div>
  );
};

export default NotFoundComponent;
