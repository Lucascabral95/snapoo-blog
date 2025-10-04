"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { GalleryPost } from "@/infrastructure/types/gallery.types";

interface EstructuraImagenesProps {
  posteos: GalleryPost[];
}

const IMAGES_PER_PAGE = 30;

const marginMasonry = (pathName: string) => {
  return {
    margin: pathName === "/feed" ? "1.5vw 0" : "0",
  };
};

export default function EstructuraImagenes({
  posteos,
}: EstructuraImagenesProps) {
  const pathName = usePathname();
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const imagenesTotales = posteos.length;
  const posteosVisibles = posteos.slice(0, visibleCount);
  const hayMasPosteos = visibleCount < imagenesTotales;

  const verMas = () => {
    setVisibleCount((prev) => prev + IMAGES_PER_PAGE);
  };

  const getDisplayName = (post: GalleryPost) => {
    return post.usuario?.userName !== ""
      ? post.usuario?.userName
      : post.usuario?.email;
  };

  const shouldShowUserInfo = pathName === "/feed/people";

  return (
    <div
      className="fotos-subidas-mi-perfil masonry"
      style={marginMasonry(pathName)}
    >
      {posteosVisibles.map((item, index) => (
        <Link
          href={`/posteo/${item._id}`}
          key={index}
          className="contenedor-fotos-subidas-mi-perfil masonry-item"
        >
          <div className="imagen">
            <Image
              loading="lazy"
              width={500}
              height={500}
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "16px",
                objectFit: "cover",
                boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
              }}
              src={item.imagen}
              alt={item.descripcion || "Imagen del post"}
            />
          </div>
          {shouldShowUserInfo && item.usuario?.userName && (
            <div className="nombre-fav-repost">
              <div className="nombre">
                <p>{getDisplayName(item)}</p>
              </div>
            </div>
          )}
        </Link>
      ))}
      {hayMasPosteos && (
        <div className="boton-de-ver-mas">
          <button onClick={verMas}>Ver más</button>
        </div>
      )}
    </div>
  );
}
