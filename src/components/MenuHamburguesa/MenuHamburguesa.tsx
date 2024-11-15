"use client";
import { motion } from "framer-motion";
import React from "react";
import { TbWorld } from "react-icons/tb";
import { RiUserSmileFill } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { signOut, useSession, signIn } from "next-auth/react";
import "./MenuHamburguesa.scss";
import { PiNut } from "react-icons/pi";
import Link from "next/link";

interface PropsMenu {
  setIsOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

interface User {
  user: {
    email: string;
    avatar: string;
    userName: string;
    id: string;
    saludo: string;
  };
}

const MenuHamburguesa: React.FC<PropsMenu> = ({ setIsOpenMenu }) => {
  const { data: session } = useSession() as { data: User | null };

  return (
    <div className="menu-hamburguesa">
      <div className="contenedor-menu-hamburguesa">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className="secciones"
        >
          <Link
            href="/feed"
            className="seccion"
            onClick={() => setIsOpenMenu(false)}
          >
            <div className="icono">
              <TbWorld className="icon" />
            </div>
            <div className="texto">
              <p> INICIO </p>
            </div>
          </Link>
          <Link
            // href={`/feed/perfil/${session?.user?.id}`}
            href={`/feed/perfil`}
            className="seccion"
            onClick={() => setIsOpenMenu(false)}
          >
            <div className="icono">
              <RiUserSmileFill className="icon" />
            </div>
            <div className="texto">
              <p> PERFIL </p>
            </div>
          </Link>
          <Link
            href="/feed/people"
            className="seccion"
            onClick={() => setIsOpenMenu(false)}
          >
            <div className="icono">
              <FaMagnifyingGlass className="icon" />
            </div>
            <div className="texto">
              <p> BUSQUEDA </p>
            </div>
          </Link>
        </motion.div>   
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className="ajustes"
        >
          <Link
            href="/feed/ajustes"
            className="ajustes-interior"
            onClick={() => setIsOpenMenu(false)}
          >
            <div className="icono">
              <PiNut className="icon" />
            </div>
            <div className="texto">
              <p> AJUSTES </p>
            </div>
          </Link>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
          transition={{ duration: 0.4 }}
          className="cerrar-sesion"
        >
          {session?.user?.saludo ? (
            <button onClick={() => signOut()}> CERRAR SESION </button>
          ) : (
            <button onClick={() => signIn()}> INICIAR SESION </button>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MenuHamburguesa;
