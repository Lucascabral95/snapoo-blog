"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { useSession, signOut } from "next-auth/react";
import Skeleton from "react-loading-skeleton";

import "./App.scss";

interface User {
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const Home: React.FC = () => {
  const { data: session } = useSession() as { data: User | null };
  const [loadingSkeleton, setLoadingSkeleton] = useState<boolean>(true);

  useEffect(() => {
    if (session?.user?.email) {
      setLoadingSkeleton(false);
    } else {
      setTimeout(() => {
        setLoadingSkeleton(false);
      }, 800);
    }
  }, [session]);

  return (
    <div className="pagina-principal">
      <div className="contenedor-pagina-principal">
        <header className="header-pagina-principal">
          <div className="header-contenedor-pagina-principal">
            <div className="logo">
              <Link href="/" className="imagen">
                <Image
                  className="img"
                  src="/img/logo-snapoo.png"
                  alt="Logo"
                  width="24"
                  height="24"
                />
              </Link>
              <div className="nombre">
                <p> Snapoo </p>
              </div>
            </div>
            <div className="botones-de-login-register">
              {loadingSkeleton ? (
                <Skeleton
                  width={144}
                  height={32}
                  baseColor="rgba(224, 224, 224, 0.2)"
                />
              ) : session?.user?.email ? (
                <div
                  className="bot"
                  onClick={() => signOut()}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="boton-ingreso-register"
                    style={{ display: "flex" }}
                  >
                    Cerrar sesión
                  </div>
                </div>
              ) : (
                <>
                  <div className="bot">
                    <Link href="/feed/login" className="boton-ingreso-login">
                      Iniciar sesión
                    </Link>
                  </div>
                  <div className="bot">
                    <Link
                      href="/feed/register"
                      className="boton-ingreso-register"
                    >
                      Registrate
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="main-pagina-principal">
          <div className="main-contenedor-pagina-principal">
            <div className="titulo-inspiracion">
              <h2> Encontrá tu inspiración </h2>
            </div>
            <div className="subtitulo">
              <p>
                Uníte a nuestra comunidad de creadores visuales y explora un
                mundo de posibilidades
              </p>
            </div>
            <div className="boton-acceder-gratis">
              <Link href="/feed/" className="link-acceder-gratis">
                Comenzá gratis
              </Link>
            </div>
          </div>
        </main>

        <footer className="footer-pagina-principal">
          <div className="footer-contenedor-pagina-principal">
            <div className="presentacion-mia">
              <p> 2024 Lucas Cabral Dev - Todos los derechos reservados </p>
            </div>
            <div className="mis-redes">
              <a
                href="https://github.com/Lucascabral95"
                target="_blank"
                rel="noreferrer"
                className="icono"
              >
                <FaGithub className="icon" />
              </a>
              <a
                href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral"
                target="_blank"
                rel="noreferrer"
                className="icono icono-del-medio"
              >
                <FaLinkedin className="icon" />
              </a>
              <a
                href="https://www.instagram.com/lucascabral95"
                target="_blank"
                rel="noreferrer"
                className="icono"
              >
                <FaInstagram className="icon" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Home;
