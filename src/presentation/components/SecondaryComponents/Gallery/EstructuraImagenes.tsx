// "use client";
// import React, { useState, useEffect, useRef } from "react";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// import { GalleryPost } from "@/infrastructure/types/gallery.types";

// interface EstructuraImagenesProps {
//   posteos: GalleryPost[];
// }

// const IMAGES_PER_PAGE = 30;

// export default function EstructuraImagenesPerfiles({
//   posteos,
// }: EstructuraImagenesProps) {
//   const pathName = usePathname();
//   const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);
//   const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
//   const containerRef = useRef<HTMLDivElement>(null);

//   const imagenesTotales = posteos.length;
//   const posteosVisibles = posteos.slice(0, visibleCount);
//   const hayMasPosteos = visibleCount < imagenesTotales;

//   const verMas = () => {
//     setVisibleCount((prev) => prev + IMAGES_PER_PAGE);
//   };

//   const getDisplayName = (post: GalleryPost) => {
//     return post.usuario?.userName !== ""
//       ? post.usuario?.userName
//       : post.usuario?.email;
//   };

//   const shouldShowUserInfo = pathName === "/feed/people";

//   const handleImageLoad = (index: number) => {
//     setLoadedImages((prev) => new Set([...prev, index]));
//   };

//   useEffect(() => {
//     if (containerRef.current && loadedImages.size > 0) {
//       const container = containerRef.current;
//       const items = Array.from(container.children) as HTMLElement[];

//       if (loadedImages.size === posteosVisibles.length) {
//         organizeMasonry(items);
//       }
//     }
//   }, [loadedImages, posteosVisibles.length]);

//   const organizeMasonry = (items: HTMLElement[]) => {
//     const gap = 4;
//     const columnCount = getColumnCount();
//     const columnHeights = Array(columnCount).fill(0);
//     const containerWidth = containerRef.current?.offsetWidth || 0;
//     const columnWidth =
//       (containerWidth - gap * (columnCount - 1)) / columnCount;

//     items.forEach((item) => {
//       if (item.classList.contains("boton-de-ver-mas")) return;

//       const minHeight = Math.min(...columnHeights);
//       const columnIndex = columnHeights.indexOf(minHeight);
//       const left = columnIndex * (columnWidth + gap);
//       const top = minHeight;

//       item.style.position = "absolute";
//       item.style.left = `${left}px`;
//       item.style.top = `${top}px`;
//       item.style.width = `${columnWidth}px`;

//       const itemHeight = item.offsetHeight;
//       columnHeights[columnIndex] += itemHeight + gap;
//     });

//     const maxHeight = Math.max(...columnHeights);
//     if (containerRef.current) {
//       containerRef.current.style.height = `${maxHeight}px`;
//     }
//   };

//   const getColumnCount = () => {
//     const width = window.innerWidth;
//     if (width >= 1400) return 5;
//     if (width >= 1200) return 4;
//     if (width >= 768) return 3;
//     return 2;
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       if (
//         containerRef.current &&
//         loadedImages.size === posteosVisibles.length
//       ) {
//         const items = Array.from(
//           containerRef.current.children
//         ) as HTMLElement[];
//         organizeMasonry(items);
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [loadedImages, posteosVisibles.length]);

//   return (
//     <div className="seccion-perfil seccion-perfil-inicio seccion-array-de-imagenes">
//       <div ref={containerRef} className="fotos-subidas-mi-perfil-masonry">
//         {posteosVisibles.map((item, index) => (
//           <Link
//             href={`/posteo/${item._id}`}
//             key={item._id || index}
//             className="contenedor-fotos-subidas-mi-perfil"
//             style={{ opacity: 0 }}
//           >
//             <div className="imagen">
//               <Image
//                 loading="lazy"
//                 width={500}
//                 height={500}
//                 style={{ width: "100%", height: "auto" }}
//                 src={item.imagen}
//                 alt={item.descripcion || "Imagen del post"}
//                 onLoad={() => handleImageLoad(index)}
//               />
//             </div>
//             {shouldShowUserInfo && item.usuario?.userName && (
//               <div className="nombre-fav-repost">
//                 <div className="nombre">
//                   <p>{getDisplayName(item)}</p>
//                 </div>
//               </div>
//             )}
//           </Link>
//         ))}
//       </div>
//       {hayMasPosteos && (
//         <div className="boton-de-ver-mas-container" onClick={verMas}>
//           <button>Ver más</button>
//         </div>
//       )}
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { GalleryPost } from "@/infrastructure/types/gallery.types";

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
              style={{ width: "100%", height: "auto" }}
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
