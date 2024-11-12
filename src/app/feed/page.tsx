"use client";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Feed.scss";

const Inicio: React.FC = () => {
  const [posteos, setPosteos] = useState<any[]>([]);
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true);
  const [sinData, setSinData] = useState<boolean>(false);

  useEffect(() => {
    const obtenerTodasLasImagenes = async () => {
      try {
        const result = await axios.get(`/api/posteos`);

        if (result.status === 200 || result.status === 201) {
          setPosteos(result.data.result);
          setLoadingSkeleton(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    obtenerTodasLasImagenes();
  }, []);

  return (
    <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
      <EstructuraImagenes posteos={posteos} sinData={sinData} />
    </div>
  );
};

export default Inicio;
