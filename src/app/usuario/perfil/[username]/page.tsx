import React from "react";

import UserProfile from "@/presentation/components/UserProfile/UserProfile";
import NotFoundComponent from "@/presentation/components/UI/NotFound";
import {
  obtenerImagenes,
  obtenerReposteos,
  obtenerUsuario,
} from "@/infrastructure/services";

type Username = {
  params: Promise<{
    username: string;
  }>;
};

const PerfilUsuario: React.FC<Username> = async ({ params }) => {
  const { username } = await params;

  const [dataPosteos, userName, rePosteos] = await Promise.all([
    obtenerImagenes(username),
    obtenerUsuario(username),
    obtenerReposteos(username),
  ]);

  const datosDelUsuario = userName.userName;

  return (
    <>
      {userName.length === 0 ? (
        <NotFoundComponent contenido="El usuario no se encuentra registrado" />
      ) : (
        <UserProfile
          dataPosteos={dataPosteos}
          datosDelUsuario={datosDelUsuario}
          rePosteos={rePosteos}
        />
      )}
    </>
  );
};

export default PerfilUsuario;
