import type { Metadata } from "next";
import EstructuraConDashboard from "@/components/EstructuraConDashboard/EstructuraConDashboard";

export const metadata: Metadata = {
  title: "Inicio | Snapoo",
  description:
    "Bienvenido a Snapoo, el blog de imágenes donde capturamos momentos únicos e inspiramos tu pasión por la fotografía. Explora, aprende y deja que cada imagen cuente su historia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <EstructuraConDashboard>{children}</EstructuraConDashboard>;
}
