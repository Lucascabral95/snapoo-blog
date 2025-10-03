import Image from "next/image";
import {
  BRAND_INFO,
  SOCIAL_LINKS,
} from "@/infrastructure/constants/navigation.constants";

export default function DashboardFooter() {
  return (
    <footer className="footer-titular">
      <div className="contenedor-footer">
        <div className="superior">
          <div className="imagen-footer">
            <Image
              className="img"
              src={BRAND_INFO.logo}
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
          <div className="texto">
            <h2> {BRAND_INFO.name} </h2>
          </div>
        </div>
        <div className="inferior-footer">
          <div className="categorias">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                target="_blank"
                rel="noopener noreferrer"
                href={link.href}
                className="secciones"
              >
                <p> {link.label} </p>
              </a>
            ))}
          </div>
          <div className="categorias">
            <div className="terminos">
              <p> {BRAND_INFO.copyright} </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
