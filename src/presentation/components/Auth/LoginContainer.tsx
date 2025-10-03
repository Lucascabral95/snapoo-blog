"use client";
import React from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import { useLoginForm } from "@/presentation/hooks/useLoginForm";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import "./Login.scss";

export default function LoginContainer() {
  const { formData, errors, handleChange, handleSubmit } = useLoginForm();

  return (
    <div className="seccion-perfil-login-register">
      <div className="contenedor-login-register">
        <div className="titulo">
          <p> Iniciá sesión en Snapoo </p>
        </div>

        <LoginForm
          formData={formData}
          errors={errors}
          onSubmit={handleSubmit}
          onChange={handleChange}
        />

        <Toaster />

        <div className="linea-delimitante">
          <div className="linea"></div>
        </div>

        <SocialLogin />

        <div className="no-tengo-cuenta">
          <div className="texto">
            <p> ¿No tenés cuenta? </p>
          </div>
        </div>

        <div className="botones">
          <Link href="/feed/register" className="cont-boton">
            <div className="boton">
              <p>Registrate</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
