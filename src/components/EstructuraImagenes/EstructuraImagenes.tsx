"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
  posteos: any[];
}

const EstructuraImagenes: React.FC<Props> = ({ posteos }) => {
  const pathName = usePathname();
  const [imagenesAMostrar, setImagenesAMostrar] = useState<number>(12);
  const [inicioFin, setInicioFin] = useState<{ inicio: number; fin: number }>({
    inicio: 0,
    fin: imagenesAMostrar,
  });
  const [imagenesTotales, setImagenesTotales] = useState<number>(0);

  useEffect(() => {
    const cantidadPosteos = posteos.length;
    setImagenesTotales(cantidadPosteos);
  }, [posteos]);

  const verMas = async () => {
    setInicioFin({
      inicio: inicioFin.inicio,
      fin: inicioFin.fin + imagenesAMostrar,
    });
  };

  return (
    <div className="fotos-subidas-mi-perfil">
      {posteos.slice(inicioFin.inicio, inicioFin.fin)?.map((item) => (
        <Link
          href={`/posteo/${item?._id}`}
          key={item?._id}
          className="contenedor-fotos-subidas-mi-perfil"
        >
          <div className="imagen">
            <Image
              loading="lazy"
              width={500}
              height={500}
              style={{ width: "100%", height: "100%" }}
              src={item?.imagen}
              alt={item?.descripcion}
            />
          </div>
          {pathName === "/feed/people" && item?.usuario?.userName ? (
            <div className="nombre-fav-repost">
              <div className="nombre">
                <p>
                  {" "}
                  {item?.usuario?.userName !== ""
                    ? item?.usuario?.userName
                    : item?.usuario?.email}{" "}
                </p>
              </div>
            </div>
          ) : null}
        </Link>
      ))}
      {inicioFin.fin < imagenesTotales && (
        <div className="boton-de-ver-mas" onClick={verMas}>
          <button> Ver más </button>
        </div>
      )}
    </div>
  );
};

export default EstructuraImagenes;
