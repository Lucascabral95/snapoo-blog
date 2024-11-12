"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
import "../Feed.scss";

const People: React.FC = () => {
  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState<string>("usuario");
  const [posteos, setPosteos] = useState<any[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const result = await axios.get(`/api/posteos`);

        if (result.status === 200 || result.status === 201) {
          if (input.trim() === "") {
            setPosteos([]);
          } else {
            let posteosFiltrados = result.data.result.filter(
              (pos: any) =>
                pos.descripcion.toLowerCase().includes(input.toLowerCase()) ||
                pos.usuario.email.toLowerCase().includes(input.toLowerCase())
            );
            setPosteos(posteosFiltrados);
          }
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("Error 404: ", error.response.data.error);
          }
        } else {
          console.log("Error de servidor o red no disponible");
        }
      }
    };

    obtenerDatos();
  }, [input, categoriaSeleccionada]);

  return (
    <div className="seccion-perfil seccion-perfil-inicio">
      <div className="busqueda">
        <div className="contenedor-de-busqueda">
          <div className="input-busqueda">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Buscar"
              name="input"
            />
          </div>
          <div className="busqueda-categorias">
            <div className="cats">
                <p> Usuarios </p>
            </div>
            <div className="cats">
                <p> Imagenes </p>
            </div>
          </div>
        </div>
      </div>

      <EstructuraImagenes posteos={posteos} />
    </div>
  );
};

export default People;
