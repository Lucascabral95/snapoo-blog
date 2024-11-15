"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

interface Props {
  posteos: any[];
}

const EstructuraImagenes: React.FC<Props> = ({ posteos }) => {
  const pathName = usePathname();

  return (
    <div className="fotos-subidas-mi-perfil">
      {posteos.map((item) => (
        <Link
          href={`/posteo/${item._id}`}
          key={item._id}
          className="contenedor-fotos-subidas-mi-perfil"
        >
          <div className="imagen">
            <Image
              width={500}
              height={500}
              style={{ width: "100%", height: "100%" }}
              src={item.imagen}
              alt={item.descripcion}
            />
          </div>
          {pathName === "/feed" || pathName === "/feed/people" ? (
            <div className="nombre-fav-repost">
              <div className="nombre">
                <p>
                  {" "}
                  {item.usuario.userName !== ""
                    ? item.usuario.userName
                    : item.usuario.email}{" "}
                </p>
              </div>
            </div>
          ) : null}
        </Link>
      ))}
    </div>
  );
};

export default EstructuraImagenes;
