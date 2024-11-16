import React from "react";
import axios from "axios";
import UserProfile from "@/components/UserProfile/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/services/authOptions";

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

      return busquedaUsuario[0].rePosteos.reverse();
    }
  } catch (error) {
    console.log(`Se produjo un error en el servidor: ${error}`);
    return [];
  }
}

async function obtenerUsuario(username: string) {
  try {
    const results = await axios.get(`${process.env.NEXTAUTH_URL}api/register`);

    if (results.status === 200 || results.status === 201) {
      return results.data.result.filter((posteo: any) => posteo.userName === username);
    }
  } catch (error) {
    console.log(`Se produjo un error en el servidor: ${error}`);
    return null;
  }
}

const PerfilUsuario: React.FC<Username> = async ({ params }) => {
  const { username } = await params;
  const session = await getServerSession(authOptions);
  
  const dataPosteos = await obtenerImagenes(username);
  const userName = await obtenerUsuario(username);
  const datosDelUsuario = userName[0].userName;
  const rePosteos = await obtenerReposteos(username);

  return (
    <>
      <UserProfile
        dataPosteos={dataPosteos}
        datosDelUsuario={datosDelUsuario}
        rePosteos={rePosteos}
        session={session}
      />
    </>
  );
};

export default PerfilUsuario;
