"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function DashboardAuthButtons() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="contenedor-setting">
        <Link
          className="boton-login-logout"
          href="/feed/login"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <div
      className="contenedor-setting"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <Link
        href="/feed/ajustes"
        className="boton-login-logout"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Ajustes
      </Link>
      <div
        onClick={() => signOut()}
        className="boton-login-logout"
        style={{
          marginTop: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        Cerrar sesión
      </div>
    </div>
  );
}
