"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import type { GalleryPost } from "@/infrastructure/types";

interface EstructuraImagenesProps {
  posteos: GalleryPost[];
}

const IMAGES_PER_PAGE = 12;

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
    <div className="fotos-subidas-mi-perfil">
      {posteosVisibles.map((item, index) => (
        <Link
          href={`/posteo/${item._id}`}
          key={index}
          className="contenedor-fotos-subidas-mi-perfil"
        >
          <div className="imagen">
            <Image
              loading="lazy"
              width={500}
              height={500}
              style={{ width: "100%", height: "100%" }}
              src={item.imagen}
              alt={item.descripcion || "Imagen del post"}
            />
          </div>
          {shouldShowUserInfo && item.usuario?.userName && (
            <div className="nombre-fav-repost">
              <div className="nombre">
                <p> {getDisplayName(item)} </p>
              </div>
            </div>
          )}
        </Link>
      ))}
      {hayMasPosteos && (
        <div className="boton-de-ver-mas" onClick={verMas}>
          <button> Ver más </button>
        </div>
      )}
    </div>
  );
}
