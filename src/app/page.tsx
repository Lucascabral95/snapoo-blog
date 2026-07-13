import Link from "next/link";
import Image from "next/image";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./App.scss";

export default function Home() {
    return (
        <div className="pagina-principal">
            <div className="contenedor-pagina-principal">
                <header className="header-pagina-principal">
                    <div className="header-contenedor-pagina-principal">
                        <div className="logo">
                            <Link href="/" className="imagen">
                                <Image className="img" src="/img/logo-snapoo.png" alt="Logo" width="24" height="24" />
                            </Link>
                            <div className="nombre"><p>Snapoo</p></div>
                        </div>
                        <div className="botones-de-login-register">
                            <div className="bot"><Link href="/login" className="boton-ingreso-login">Iniciar sesion</Link></div>
                            <div className="bot"><Link href="/register" className="boton-ingreso-register">Registrate</Link></div>
                        </div>
                    </div>
                </header>

                <main className="main-pagina-principal">
                    <div className="main-contenedor-pagina-principal">
                        <div className="titulo-inspiracion"><h2>Encontra tu inspiracion</h2></div>
                        <div className="subtitulo"><p>Unite a nuestra comunidad de creadores visuales y explora un mundo de posibilidades</p></div>
                        <div className="boton-acceder-gratis"><Link href="/register" className="link-acceder-gratis">Comenza gratis</Link></div>
                    </div>
                </main>

                <footer className="footer-pagina-principal">
                    <div className="footer-contenedor-pagina-principal">
                        <div className="presentacion-mia"><p>2024 Lucas Cabral Dev - Todos los derechos reservados</p></div>
                        <div className="mis-redes">
                            <a href="https://github.com/Lucascabral95" target="_blank" rel="noreferrer" className="icono"><FaGithub className="icon" /></a>
                            <a href="https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral" target="_blank" rel="noreferrer" className="icono icono-del-medio"><FaLinkedin className="icon" /></a>
                            <a href="https://www.instagram.com/lucasgamerpolar10" target="_blank" rel="noreferrer" className="icono"><FaInstagram className="icon" /></a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
