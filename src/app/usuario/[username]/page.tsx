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
    const results = await axios.get(`${process.env.NEXTAUTH_URL}api/posteos`);

    if (results.status === 200 || results.status === 201) {
      const filtro = results.data.result
        .filter((posteo: any) => posteo.usuario.userName === username)
        .reverse();

      return filtro;
    }

    return [];
  } catch (error: any) {
    console.log(`Se produjo un error en el servidor: ${error}`);
    return [];
  }
}

async function obtenerReposteos(username: string) {
  try {
    const results = await axios.get(`${process.env.NEXTAUTH_URL}api/intereses`);

    if (results.status === 200 || results.status === 201) {
      const busquedaUsuario = results.data.result.filter(
        (posteo: any) => posteo.user.userName === username
      );

      if (busquedaUsuario.length > 0 && busquedaUsuario[0]?.rePosteos) {
        return busquedaUsuario[0].rePosteos.reverse();
      }

      return [];
    }

    return [];
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

    return [];
  } catch (error: any) {
    if (error.response?.status === 404 || error.response?.status === 500) {
      return [];
    }
    return [];
  }
}

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
