import React from "react";
import axios from "axios";
import UserProfile from "@/components/UserProfile/UserProfile";
import NotFoundComponent from "@/components/NotFound/NotFound";

type Username = {
  params: Promise<{
    username: string;
  }>;
};

async function obtenerImagenes(username: string) {
  try {
    const results = await axios.get(
      `${process.env.NEXTAUTH_URL}api/posteos/posteosPorUsuario?username=${username}`
    );

    if (results.status === 200 || results.status === 201) {
      return results.data.result;
    }
  } catch (error: any) {
    console.log(`Se produjo un error en el servidor: ${error}`);
    return [];
  }
}

async function obtenerReposteos(username: string) {
  try {
    const results = await axios.get(
      `${process.env.NEXTAUTH_URL}api/intereses/interesesPorUsuario?username=${username}`
    );

    if (results.status === 200 || results.status === 201) {
      return results.data.result;
    }
  } catch (error) {
    console.log(`Se produjo un error en el servidor: ${error}`);
    return [];
  }
}

async function obtenerUsuario(username: string) {
  try {
    const results = await axios.get(
      `${process.env.NEXTAUTH_URL}api/register?username=${username}`
    );

    if (results.status === 200 || results.status === 201) {

      return results.data.result;
    }
  } catch (error: any) {
    if (error.response.status === 404 || error.response.status === 500) {
      return [];
    }
  }
}

const PerfilUsuario: React.FC<Username> = async ({ params }) => {
  const { username } = await params;

  const dataPosteos = await obtenerImagenes(username);
  const userName = await obtenerUsuario(username);
  const datosDelUsuario = userName.userName;
  const rePosteos = await obtenerReposteos(username);

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
