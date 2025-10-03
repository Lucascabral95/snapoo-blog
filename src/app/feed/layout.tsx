import type { Metadata } from "next";
import type { ReactNode } from "react";

// import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";
import EstructuraConDashboard from "@/presentation/components/SecondaryComponents/EstructuraConDashboard/EstructuraConDashboard";

interface FeedLayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: "%s | Snapoo",
    default: "Inicio | Snapoo",
  },
  description:
    "Bienvenido a Snapoo, el blog de imágenes donde capturamos momentos únicos e inspiramos tu pasión por la fotografía. Explora, aprende y deja que cada imagen cuente su historia.",
  keywords: [
    "fotografía",
    "imágenes",
    "galería",
    "momentos",
    "inspiración",
    "blog fotográfico",
  ],
  openGraph: {
    title: "Snapoo - Feed de Imágenes",
    description:
      "Explora momentos únicos e inspírate con fotografías increíbles",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function FeedLayout({ children }: FeedLayoutProps) {
  return <EstructuraConDashboard>{children}</EstructuraConDashboard>;
}
