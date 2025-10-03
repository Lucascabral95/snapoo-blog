import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";
import type { Metadata } from "next";
import type { ReactNode } from "react";

interface LayoutPerfilProps {
  children: ReactNode;
  params: Promise<{ username: string }>;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Snapoo",
    default: "Perfil de Usuario | Snapoo",
  },
  description:
    "Descubre los perfiles de nuestros usuarios, sus mejores imágenes y galerías personalizadas. Inspírate con fotografías únicas y conecta con una comunidad creativa.",
  keywords: [
    "perfil de usuario",
    "galería fotográfica",
    "fotografías",
    "comunidad creativa",
    "imágenes",
    "snapoo",
  ],
  openGraph: {
    type: "profile",
    siteName: "Snapoo",
  },
  twitter: {
    card: "summary_large_image",
    site: "@snapoo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function LayoutPerfil({ children }: LayoutPerfilProps) {
  return <EstructuraConDashboard>{children}</EstructuraConDashboard>;
}
