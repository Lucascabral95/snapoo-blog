import type { Metadata } from "next";
import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";

export const metadata: Metadata = {
  title: "Perfil de Usuario | Snapoo",
  description:
    "Descubre los perfiles de nuestros usuarios, sus mejores imágenes y galerías personalizadas en este blog. Inspírate con fotografías únicas y conecta con una comunidad creativa.",
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
