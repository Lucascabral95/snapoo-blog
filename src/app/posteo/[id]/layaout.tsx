import type { Metadata } from "next";
import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";

export const metadata: Metadata = {
  title: "Publicación | Snapoo",
  description:
    "Explora las publicaciones de nuestro blog de imágenes y encuentra contenido visual inspirador. Descubre las mejores imágenes y galerías de nuestros usuarios y conecta con una comunidad de creativos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <EstructuraConDashboard>{children}</EstructuraConDashboard>
  );
}
