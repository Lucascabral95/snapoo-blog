// "use client";
// import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import "./Feed.scss";

// const Inicio: React.FC = () => {
//   const [posteos, setPosteos] = useState<any[]>([]);

//   useEffect(() => {
//     const getImages = async () => {
//       try {
//         const result = await axios.get(`/api/posteo`);

//         if (result.status === 200 || result.status === 201) {
//           setPosteos(result.data.result.reverse());
//         }
//       } catch (error: any) {
//         if(error.response.status === 500) {
//           window.location.reload();
//         } else {
//           console.log(error.response.data.error);
//         }
//       }
//     };

//     if(posteos.length === 0) {
//       getImages();
//     }
//   }, [posteos.length]);

//   return (
//     <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
//       <EstructuraImagenes posteos={posteos} />
//     </div>
//   );
// };

// export default Inicio;

// SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION
// SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION
// SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION
// SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION
// SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION SEPARACION

import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
import axios from "axios";
import React from "react";
import "./Feed.scss";

// export const dynamic = "force-dynamic";

async function obtenerImagenes(retry = 3) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}api/posteos`, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Error al obtener los datos.");
    }

    const data = await res.json();
    return data.result.reverse();
  } catch (error) {
    if (retry > 0) {
      console.warn(`Reintentando... (${3 - retry + 1})`);
      return obtenerImagenes(retry - 1);
    }
    console.log(`Se produjo un error en el servidor: ${error}`);
    return [];
  }
}

const Inicio = async () => {
  const posteos = await obtenerImagenes();

  return (
    <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
      <EstructuraImagenes posteos={posteos} />
    </div>
  );
};

export default Inicio;
