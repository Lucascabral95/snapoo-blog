import type { Metadata } from "next";
import { geistSans, geistMono } from "@/infrastructure/config/fonts";
import { siteMetadata } from "@/infrastructure/config/metadata";
import Provider from "@/Provider";

import "react-loading-skeleton/dist/skeleton.css";
import "./App.scss";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
