import axios from "axios";

const BASE_URL = process.env.NEXTAUTH_URL || "";

export async function obtenerImagenes(username: string) {
  try {
    const results = await axios.get(`${BASE_URL}api/posteos`);

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

export async function obtenerReposteos(username: string) {
  try {
    const results = await axios.get(`${BASE_URL}api/intereses`);

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

export async function obtenerUsuario(username: string) {
  try {
    const results = await axios.get(
      `${BASE_URL}api/register?username=${username}`
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
