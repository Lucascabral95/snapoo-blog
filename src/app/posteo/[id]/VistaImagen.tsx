"use client";
import React from "react";
import "./VistaImagen.scss";
import { IoMdClose } from "react-icons/io";
import { BiRepost } from "react-icons/bi";
import { IoHeart } from "react-icons/io5";
import { MdFavorite } from "react-icons/md";
import Image from "next/image";
import moment from "moment";
import "moment/locale/es";
import Link from "next/link";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

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

interface IUser {
  user: {
    id: string;
    email: string;
    userName: string;
  };
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
  const { data: session } = useSession() as { data: IUser | null };
  const [likeCount, setLikeCount] = React.useState<number>(likes);

  const repostear = async () => {
    try {
      const result = await axios.post(`/api/intereses`, {
        rePosteos: id,
        user: session?.user?.id,
      });

      if (result.status === 200) {
        toast.success("Se reposteó posteo");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          toast.error("Ya reposteaste este posteo");
        } else {
          console.log(error.response.data.error);
        }
      }
    }
  };

  const darLike = async () => {
    try {
      const result = await axios.put(`/api/posteos/?id=${id}`);

      if (result.status === 200 || result.status === 201) {
        toast.success("Like dado con exito");
        setLikeCount(result.data.result.likes);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
          console.log(error.response.data.error);
        } else {
          console.log(error.response.data.error);
        }
      }
    }
  };

  return (
    <div className="vista-imagen">
      <div className="contenedor-vista-imagen">
        <div className="cont-icono">
          <div
            className="icono-de-cierre"
            onClick={() => window.history.back()}
          >
            <IoMdClose className="icono" />
          </div>
          <div className="icono-de-cierre icono-de-cierre-fav-repost">
            <div className="icon" onClick={darLike}>
              <IoHeart className="icono-corazon" />
            </div>
            <div className="icon" onClick={repostear}>
              <BiRepost className="icono" />
            </div>
          </div>
        </div>
        <div className="imagen-de-posteo">
          {loadingSkeleton ? (
            <Skeleton width={1280} height={700} />
          ) : url ? (
            <Image
              src={url}
              alt="Imagen del posteo"
              className="img-imagen-del-posteo"
              style={{ userSelect: "none" }}
              width={1280}
              height={700}
            />
          ) : null}

          <div className="fecha-usuario-favoritos">
            <div className="likes">
              <div className="icono-like">
                <IoHeart className="icon" />
              </div>
              <div className="cantidad-likes">
                {likeCount === undefined || likeCount === null ? (
                  <p> Me gustas: {likes} </p>
                ) : (
                  <p> Me gustas: {likeCount} </p>
                )}
              </div>
            </div>
            <div className="usuarios-favoritos">
              <Link href={`/usuario/${username}`} className="usuario">
                <p> {usuario} </p>
              </Link>
              <div
                className="iconos-de-interacciones"
                style={{ display: "none" }}
              >
                <div className="icono">
                  <MdFavorite className="icon" />
                </div>
                <div className="icono">
                  <BiRepost className="icon" />
                </div>
              </div>
            </div>
            {descripcion !== "" && (
              <div className="descripcion">
                <div className="detalle">
                  <p> {descripcion} </p>
                </div>
              </div>
            )}
            <Toaster />
            <div className="descripcion-fecha">
              <div className="detalle">
                <p> {moment(fecha).format("LL")} </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VistaImagen;
