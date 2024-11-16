import type { Metadata } from "next";
import localFont from "next/font/local";
import "./App.scss";
import Provider from "@/Provider";
import 'react-loading-skeleton/dist/skeleton.css'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Snapoo Blog",
  description: "Descubre los perfiles de nuestros usuarios, sus mejores imágenes y galerías personalizadas en este blog. Inspírate con fotografías únicas y conecta con una comunidad creativa.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
