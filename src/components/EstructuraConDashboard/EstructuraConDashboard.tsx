"use client";
import "./EstructuraConDashboard.scss";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { RiUserSmileFill } from "react-icons/ri";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { signOut, useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import MenuHamburguesa from "../MenuHamburguesa/MenuHamburguesa";

interface Props {
  children: React.ReactNode;
}

interface IUser {
  user: {
    email: string;
    userName: string;
    avatar?: string;
    id: string;
  };
}

const EstructuraConDashboard = ({ children }: Props) => {
  const { data: session } = useSession() as { data: IUser | null };
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="estructura-con-dashboard">
      <div className="contenedor-estructura-con-dashboard">
        <header className="header-titular">
          <div className="div-superior">
            <div className="div-logo">
              <div className="logo">
                <Link href="/feed" className="imagen">
                  <Image
                    className="img"
                    src="/img/logo-snapoo.png"
                    alt="Logo"
                    width="40"
                    height="40"
                  />
                </Link>
                <div className="titulo">
                  <h1> Snapoo </h1>
                </div>
              </div>
              <div className="categorias">
                <Link href="/feed" className="cat">
                  <div className="icono">
                    <TbWorld className="icon" />
                  </div>
                  <div className="texto">
                    <p> INICIO </p>
                  </div>
                </Link>
                <Link href={`/feed/perfil/${session?.user?.id}`} className="cat">
                  <div className="icono">
                    <RiUserSmileFill className="icon" />
                  </div>
                  <div className="texto">
                    <p> PERFIL </p>
                  </div>
                </Link>
                <Link href="/feed/people" className="cat">
                  <div className="icono">
                    <FaMagnifyingGlass className="icon" />
                  </div>
                  <div className="texto">
                    <p> BUSQUEDA </p>
                  </div>
                </Link>
              </div>
            </div>
            <div className="parte-inferior">
              {session ? (
                <div
                  className="contenedor-setting"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Link
                    href="/feed/ajustes"
                    className="boton-login-logout"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Ajustes
                  </Link>
                  <div
                    onClick={() => signOut()}
                    className="boton-login-logout"
                    style={{
                      marginTop: "14px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Cerrar sesión
                  </div>
                </div>
              ) : (
                <div className="contenedor-setting">
                  <Link
                    className="boton-login-logout"
                    href="/feed/login"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {" "}
                    Iniciar sesión{" "}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </header>

        {isOpenMenu && <MenuHamburguesa setIsOpenMenu={setIsOpenMenu} />}

        <header className="header-mobile">
          <div className="contenedor-header-mobile">
            <div className="parte">
              <Link href="/feed" className="imagen">
                <Image
                  src="/img/logo-snapoo.png"
                  alt="Logo"
                  width="32"
                  height="32"
                  className="img"
                />
              </Link>
              <div className="titulo">
                <h1> Snapoo/ {session?.user?.email} </h1>
              </div>
            </div>
            <div className="parte">
              <div className="menu" onClick={() => setIsOpenMenu(!isOpenMenu)}>
                {isOpenMenu ? (
                  <MdClose
                    className="icon"
                    onClick={() => setIsOpenMenu(false)}
                  />
                ) : (
                  <CiMenuFries
                    className="icon"
                    onClick={() => setIsOpenMenu(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="contenido-interno">
          <main className="main-titular">
            <div className="contenedor-main-titular">{children}</div>
          </main>

          <footer className="footer-titular">
            <div className="contenedor-footer">
              <div className="superior">
                <div className="imagen-footer">
                  <Image
                    className="img"
                    src="/img/logo-snapoo.png"
                    alt="Logo"
                    width="40"
                    height="40"
                  />
                </div>
                <div className="texto">
                  <h2> Snapoo </h2>
                </div>
              </div>
              <div className="inferior-footer">
                <div className="categorias">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://github.com/Lucascabral95"
                    className="secciones"
                  >
                    <p> Github </p>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.instagram.com/lucascabral95/"
                    className="secciones"
                  >
                    <p> Instagram </p>
                  </a>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/"
                    className="secciones"
                  >
                    <p> Linkedin </p>
                  </a>
                </div>
                <div className="categorias">
                  <div className="terminos">
                    <p> Copyright 2024 - Lucas Cabral </p>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default EstructuraConDashboard;
