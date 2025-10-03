"use client";

import React from "react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function SocialLogin() {
  return (
    <div className="botones">
      <div className="cont-boton" onClick={() => signIn("google")}>
        <div className="icono">
          <FcGoogle className="icon" />
        </div>
        <div className="boton">
          <p> Ingresá con Google </p>
        </div>
      </div>
    </div>
  );
}
