"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import VistaImagen from "./VistaImagen";

const Posteos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dataPosteos, setDataPosteos] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true);

  useEffect(() => {
    const obtenerPosteo = async () => {
      try {
        const result = await axios.get(`/api/posteos?id=${id}`);

        if (result.status === 200) {
          setDataPosteos(result.data.result);
          setLoadingSkeleton(false);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404 || error.response.status === 400) {
            setError("No se encontro el posteo");
          }
        } else {
          setError("Error al obtener el posteo");
          console.log(error);
        }
      }
    };

    obtenerPosteo();
  }, [id]);

  return (
    <>
      {error ? (
        <p>{error}</p>
      ) : (
        <VistaImagen
          id={dataPosteos?._id}
          url={dataPosteos?.imagen}
          likes={dataPosteos?.likes}
          descripcion={dataPosteos?.descripcion}
          fecha={dataPosteos?.fecha}
          usuario={dataPosteos?.usuario?.userName === "" ? dataPosteos?.usuario?.email : dataPosteos?.usuario?.userName}
          username={dataPosteos?.usuario?.userName}
          loadingSkeleton={loadingSkeleton}
        />
      )}
    </>
  );
};

export default Posteos;
