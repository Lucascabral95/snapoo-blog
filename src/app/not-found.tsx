import React from "react";

import NotFoundComponent from "@/presentation/components/UI/NotFound";
import EstructuraConDashboard from "@/presentation/components/SecondaryComponents/EstructuraConDashboard/EstructuraConDashboard";

const NotFound = () => {
  return (
    <EstructuraConDashboard>
      <NotFoundComponent contenido="Página no encontrada" />
    </EstructuraConDashboard>
  );
};

export default NotFound;
