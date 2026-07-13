import type { Metadata } from "next";
import { fontDisplay, fontBody, fontMono } from "@/infrastructure/config/fonts";
import { siteMetadata } from "@/infrastructure/config/metadata";
import Provider from "@/Provider";

import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
