"use client";

import { motion } from "framer-motion";
import React from "react";
import { TbWorld } from "react-icons/tb";
import { RiUserSmileFill } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { PiNut } from "react-icons/pi";
import { signOut, useSession, signIn } from "next-auth/react";
import Link from "next/link";
import "./MenuHamburguesa.scss";

interface MenuHamburguesaProps {
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

const MENU_ANIMATION = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
  transition: { duration: 0.4 },
};

const NAVIGATION_LINKS = [
  { href: "/feed", icon: TbWorld, label: "INICIO" },
  {
    href: "/usuario/perfil",
    icon: RiUserSmileFill,
    label: "PERFIL",
    requiresUsername: true,
  },
  { href: "/feed/people", icon: FaMagnifyingGlass, label: "BUSQUEDA" },
];

export default function MenuHamburguesa({
  setIsOpenMenu,
}: MenuHamburguesaProps) {
  const { data: session } = useSession() as { data: User | null };

  const handleClose = () => setIsOpenMenu(false);
  const isAuthenticated = !!session?.user?.saludo;

  return (
    <div className="menu-hamburguesa">
      <div className="contenedor-menu-hamburguesa">
        <motion.div {...MENU_ANIMATION} className="secciones">
          {NAVIGATION_LINKS.map((link) => {
            const href = link.requiresUsername
              ? `${link.href}/${session?.user?.userName}`
              : link.href;
            const Icon = link.icon;

            return (
              <Link
                key={link.label}
                href={href}
                className="seccion"
                onClick={handleClose}
              >
                <div className="icono">
                  <Icon className="icon" />
                </div>
                <div className="texto">
                  <p> {link.label} </p>
                </div>
              </Link>
            );
          })}
        </motion.div>

        <motion.div {...MENU_ANIMATION} className="ajustes">
          <Link
            href="/feed/ajustes"
            className="ajustes-interior"
            onClick={handleClose}
          >
            <div className="icono">
              <PiNut className="icon" />
            </div>
            <div className="texto">
              <p> AJUSTES </p>
            </div>
          </Link>
        </motion.div>

        <motion.div {...MENU_ANIMATION} className="cerrar-sesion">
          {isAuthenticated ? (
            <button onClick={() => signOut()}> CERRAR SESION </button>
          ) : (
            <button onClick={() => signIn()}> INICIAR SESION </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
