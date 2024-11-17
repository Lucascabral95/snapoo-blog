import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";
import NotFoundComponent from "@/components/NotFound/NotFound";
import React from "react";

const NotFound = () => {
  return (
    <EstructuraConDashboard>
      <NotFoundComponent contenido="Página no encontrada" />
    </EstructuraConDashboard>
  );
};

export default NotFound;
