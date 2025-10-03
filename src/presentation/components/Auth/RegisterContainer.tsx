"use client";
import React from "react";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import { useRegisterForm } from "@/presentation/hooks/useRegisterForm";
import RegisterForm from "./RegisterForm";
import SocialLogin from "./SocialLogin";
import "./Login.scss";

export default function RegisterContainer() {
  const { formData, errors, handleChange, handleSubmit } = useRegisterForm();

  return (
    <div className="seccion-perfil-login-register">
      <div className="contenedor-login-register">
        <div className="titulo">
          <p> Create una cuenta en Snapoo </p>
        </div>

        <RegisterForm
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
            <p> ¿Tenés una cuenta? </p>
          </div>
        </div>

        <div className="botones">
          <Link href="/feed/login" className="cont-boton">
            <div className="boton">
              <p>Iniciá sesión</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
