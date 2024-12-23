"use client";
import EstructuraImagenes from "@/components/EstructuraImagenes/EstructuraImagenes";
import axios from "axios";
import React, { useState, useEffect } from "react";
import "./Feed.scss";

const Inicio: React.FC = () => {
  const [posteos, setPosteos] = useState<any[]>([]);

  useEffect(() => {
    const getImages = async () => {
      try {
        const result = await axios.get(`/api/posteo`);

        if (result.status === 200 || result.status === 201) {
          setPosteos(result.data.result.reverse());
        }
      } catch (error: any) {
        if (error.response.status === 500) {
          window.location.reload();
        } else {
          console.log(error.response.data.error);
        }
      }
    };
    
    getImages();
  }, []);

  return (
    <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
      <EstructuraImagenes posteos={posteos} />
    </div>
  );
};

export default Inicio;
