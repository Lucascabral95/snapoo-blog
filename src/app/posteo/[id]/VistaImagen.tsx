// "use client";
// import React from "react";
// import { IoMdClose } from "react-icons/io";
// import { BiRepost } from "react-icons/bi";
// import { IoHeart, IoHeartOutline } from "react-icons/io5";
// import Image from "next/image";
// import moment from "moment";
// import "moment/locale/es";
// import Link from "next/link";
// import { Toaster } from "react-hot-toast";
// import Skeleton from "react-loading-skeleton";
// import Avvvatars from "avvvatars-react";

// import "./VistaImagen.scss";
// import useVistaImagen from "@/presentation/hooks/useVistaImagen";

// interface VistaImagenProps {
//   url: string;
//   descripcion: string;
//   fecha: string;
//   likes: number;
//   usuario: string;
//   id: string;
//   username: string;
//   loadingSkeleton: boolean;
// }

// const VistaImagen: React.FC<VistaImagenProps> = ({
//   id,
//   url,
//   descripcion,
//   fecha,
//   likes,
//   usuario,
//   username,
//   loadingSkeleton,
// }): JSX.Element => {
//   const { repostear, darLike, likeCount, hasLiked, isReposting, isLiking } =
//     useVistaImagen({ id, likes });

//   return (
//     <div className="vista-imagen">
//       <div className="contenedor-vista-imagen">
//         <div className="header-actions">
//           <button
//             className="btn-action btn-close"
//             onClick={() => window.history.back()}
//             aria-label="Cerrar"
//           >
//             <IoMdClose className="icon" />
//           </button>

//           <div className="header-right-actions">
//             <button
//               className={`btn-action btn-like ${hasLiked ? "liked" : ""}`}
//               onClick={darLike}
//               disabled={isLiking}
//               aria-label="Me gusta"
//             >
//               {hasLiked ? (
//                 <IoHeart className="icon icon-heart" />
//               ) : (
//                 <IoHeartOutline className="icon icon-heart" />
//               )}
//             </button>
//             <button
//               className={`btn-action btn-repost ${
//                 isReposting ? "reposting" : ""
//               }`}
//               onClick={repostear}
//               disabled={isReposting}
//               aria-label="Repostear"
//             >
//               <BiRepost className="icon icon-repost" />
//             </button>
//           </div>
//         </div>

//         <div className="imagen-container">
//           {loadingSkeleton ? (
//             <div className="skeleton-wrapper">
//               <Skeleton width="100%" height={700} borderRadius={16} />
//             </div>
//           ) : url ? (
//             <div className="imagen-wrapper">
//               <Image
//                 src={url}
//                 alt={descripcion || "Imagen del posteo"}
//                 className="imagen-posteo"
//                 width={1280}
//                 height={700}
//                 style={{ userSelect: "none" }}
//                 priority
//               />
//             </div>
//           ) : null}

//           <div className="posteo-info">
//             <div className="stats-bar">
//               <div className="likes-count">
//                 <IoHeart className="icon-stat" />
//                 <span>{likeCount.toLocaleString()}</span>
//                 <span className="label">Me gusta</span>
//               </div>
//             </div>

//             <div className="usuario-info">
//               <Link href={`/usuario/${username}`} className="avatar-link">
//                 <Avvvatars value={username} size={40} style="shape" />
//               </Link>
//               <Link href={`/usuario/${username}`} className="username-link">
//                 <span className="username">{usuario}</span>
//               </Link>
//             </div>

//             {descripcion && (
//               <div className="descripcion-section">
//                 <p className="descripcion-text">{descripcion}</p>
//               </div>
//             )}

//             <div className="fecha-section">
//               <p className="fecha-text">{moment(fecha).format("LL")}</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Toaster position="bottom-center" />
//     </div>
//   );
// };

// export default VistaImagen;
"use client";
import React from "react";
import { IoMdClose } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import { Toaster } from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import Avvvatars from "avvvatars-react";

import "./VistaImagen.scss";
import useVistaImagen from "@/presentation/hooks/useVistaImagen";

interface VistaImagenProps {
  url: string;
  descripcion: string;
  fecha: string;
  likes: number;
  usuario: string;
  id: string;
  username: string;
  loadingSkeleton: boolean;
}

const VistaImagen: React.FC<VistaImagenProps> = ({
  id,
  url,
  descripcion,
  fecha,
  likes,
  usuario,
  username,
  loadingSkeleton,
}): JSX.Element => {
  const { repostear, darLike, likeCount, hasLiked, isReposting, isLiking } =
    useVistaImagen({ id, likes });

  return (
    <div className="vista-imagen">
      <div className="contenedor-vista-imagen">
        {/* Header con usuario */}
        <div className="header-post">
          <div className="usuario-header">
            <Link href={`/usuario/perfil/${username}`} className="avatar-link">
              <Avvvatars value={username} size={32} style="shape" />
            </Link>
            <Link
              href={`/usuario/perfil/${username}`}
              className="username-link"
            >
              <span className="username">{usuario}</span>
            </Link>
          </div>
          <button
            className="btn-close"
            onClick={() => window.history.back()}
            aria-label="Cerrar"
          >
            <IoMdClose className="icon" />
          </button>
        </div>

        {/* Imagen */}
        <div className="imagen-container">
          {loadingSkeleton ? (
            <div className="skeleton-wrapper">
              <Skeleton width="100%" height={614} />
            </div>
          ) : url ? (
            <div className="imagen-wrapper">
              <Image
                src={url}
                alt={descripcion || "Imagen del posteo"}
                className="imagen-posteo"
                width={1280}
                height={700}
                style={{ userSelect: "none" }}
                priority
              />
            </div>
          ) : null}
        </div>

        {/* Acciones debajo de la imagen */}
        <div className="acciones-bar">
          <button
            className={`btn-action btn-like ${hasLiked ? "liked" : ""}`}
            onClick={darLike}
            disabled={isLiking}
            aria-label="Me gusta"
          >
            {hasLiked ? (
              <IoHeart className="icon icon-heart" />
            ) : (
              <IoHeartOutline className="icon icon-heart" />
            )}
          </button>

          <button
            className={`btn-action btn-repost ${
              isReposting ? "reposting" : ""
            }`}
            onClick={repostear}
            disabled={isReposting}
            aria-label="Repostear"
          >
            <BiRepost className="icon icon-repost" />
          </button>
        </div>

        {/* Info del post */}
        <div className="posteo-info">
          {/* Likes count */}
          <div className="likes-section">
            <span className="likes-text">
              {likeCount.toLocaleString()} me gusta
            </span>
          </div>

          {/* Descripción */}
          {descripcion && (
            <div className="descripcion-section">
              <Link
                href={`/usuario/perfil/${username}`}
                className="username-bold"
              >
                {usuario}
              </Link>
              <span className="descripcion-text"> {descripcion}</span>
            </div>
          )}

          {/* Fecha */}
          <div className="fecha-section">
            <span className="fecha-text">{moment(fecha).fromNow()}</span>
          </div>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};

export default VistaImagen;
