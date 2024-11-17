"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import VistaImagen from "./VistaImagen";
import NotFoundComponent from "@/components/NotFound/NotFound";
import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";

const Posteos: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [dataPosteos, setDataPosteos] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
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
          if (error.response.status === 404 || error.response.status === 500) {
            setError(true);
            console.log(`No se encontro el posteo solicitado`);
          }
        } else {
          setError(true);
          console.log(error);
        }
      }
    };

    obtenerPosteo();
  }, [id]);

  return (
    <>
      {error ? (
        <EstructuraConDashboard>
          <NotFoundComponent contenido="Posteo no encontrado" />
        </EstructuraConDashboard>
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