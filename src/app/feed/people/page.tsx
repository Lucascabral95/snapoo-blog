// "use client";
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import EstructuraImagenes from "@/presentation/components/SecondaryComponents/Gallery/EstructuraImagenes";
// import "../Feed.scss";

// const People: React.FC = () => {
//   const [categoriaSeleccionada, setCategoriaSeleccionada] =
//     useState<string>("usuario");
//   const [posteos, setPosteos] = useState<any[]>([]);
//   const [input, setInput] = useState<string>("");

//   useEffect(() => {
//     const obtenerDatos = async () => {
//       try {
//         const result = await axios.get(`/api/posteos`);

//         if (result.status === 200 || result.status === 201) {
//           if (input.trim() === "") {
//             setPosteos([]);
//           } else {
//             let posteosFiltrados = result.data.result.filter(
//               (pos: any) =>
//                 pos.descripcion.toLowerCase().includes(input.toLowerCase()) ||
//                 pos.usuario.email.toLowerCase().includes(input.toLowerCase())
//             );
//             setPosteos(posteosFiltrados);
//           }
//         }
//       } catch (error: any) {
//         if (error.response) {
//           if (error.response.status === 404) {
//             console.log("Error 404: ", error.response.data.error);
//           }
//         } else {
//           console.log("Error de servidor o red no disponible");
//         }
//       }
//     };

//     obtenerDatos();
//   }, [input, categoriaSeleccionada]);

//   return (
//     <div className="seccion-perfil seccion-perfil-inicio">
//       <div className="busqueda">
//         <div className="contenedor-de-busqueda">
//           <div className="input-busqueda">
//             <input
//               type="text"
//               onChange={(e) => setInput(e.target.value)}
//               placeholder="Buscar"
//               name="input"
//             />
//           </div>
//           <div className="busqueda-categorias">
//             <div className="cats">
//               <p> Usuarios </p>
//             </div>
//             <div className="cats">
//               <p> Imagenes </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       <EstructuraImagenes posteos={posteos} />
//     </div>
//   );
// };

// export default People;

"use client";
import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useDebounce } from "@/presentation/hooks/useDebounce";
import EstructuraImagenes from "@/presentation/components/SecondaryComponents/Gallery/EstructuraImagenes";
import "../Feed.scss";

type Category = "usuarios" | "imagenes";

interface Post {
  _id: string;
  descripcion: string;
  imagen: string;
  usuario: {
    email: string;
    userName: string;
  };
}

export default function People() {
  const [categoria, setCategoria] = useState<Category>("imagenes");
  const [todosLosPosteos, setTodosLosPosteos] = useState<Post[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const debouncedInput = useDebounce(input, 300);

  useEffect(() => {
    const cargarPosteos = async () => {
      if (todosLosPosteos.length > 0) return;

      setIsLoading(true);
      try {
        const { data } = await axios.get("/api/posteos");
        if (data?.result) {
          setTodosLosPosteos(data.result);
        }
      } catch (error: any) {
        console.error("Error al cargar posteos:", error);
      } finally {
        setIsLoading(false);
      }
    };

    cargarPosteos();
  }, []);

  const posteosFiltrados = useMemo(() => {
    if (!debouncedInput.trim()) return [];

    const searchTerm = debouncedInput.toLowerCase();

    console.log(`searchTerm es ${searchTerm}`);

    return todosLosPosteos.filter((post) => {
      const descripcionMatch = post.descripcion
        ?.toLowerCase()
        .includes(searchTerm);
      const emailMatch = post.usuario?.email
        ?.toLowerCase()
        .includes(searchTerm);
      const usernameMatch = post.usuario?.userName
        ?.toLowerCase()
        .includes(searchTerm);

      return descripcionMatch || emailMatch || usernameMatch;
    });
  }, [debouncedInput, todosLosPosteos]);

  return (
    <div className="seccion-perfil seccion-perfil-inicio">
      <div className="busqueda">
        <div className="contenedor-de-busqueda">
          <div className="input-busqueda">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Buscar usuarios o imágenes..."
              value={input}
              name="input"
            />
          </div>
          <div className="busqueda-categorias">
            <div
              className={`cats ${categoria === "usuarios" ? "active" : ""}`}
              onClick={() => setCategoria("usuarios")}
            >
              <p>Usuarios</p>
            </div>
            <div
              className={`cats ${categoria === "imagenes" ? "active" : ""}`}
              onClick={() => setCategoria("imagenes")}
            >
              <p>Imágenes</p>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-state">Cargando...</div>
      ) : (
        <EstructuraImagenes posteos={posteosFiltrados} />
      )}
    </div>
  );
}
