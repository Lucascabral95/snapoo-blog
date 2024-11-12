import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";
import React from "react";
import "./App.scss";
import Image from "next/image";

const NotFound = () => {
  return (
    <EstructuraConDashboard>
      <div className="not-found">
        <div className="contenedor-not-found">
          <div className="titulo-de-pagina">
            <h2> Pagina no encontrada </h2>
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
    </EstructuraConDashboard>
  );
};

export default NotFound;
