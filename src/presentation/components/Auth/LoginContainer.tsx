"use client";

import Link from "next/link";
import { Toaster } from "react-hot-toast";
import { useLoginForm } from "@/presentation/hooks/useLoginForm";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import "./Login.scss";

export default function LoginContainer() {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useLoginForm();
  return <main className="seccion-perfil-login-register"><section className="contenedor-login-register"><div className="titulo"><p>Iniciá sesión en Snapoo</p></div><LoginForm formData={formData} errors={errors} isLoading={isLoading} onSubmit={handleSubmit} onChange={handleChange} /><p className="caracteres-obligatorios"><Link href="/feed/forgot-password">¿Olvidaste tu contraseña?</Link></p><div className="linea-delimitante"><div className="linea" /></div><SocialLogin /><div className="no-tengo-cuenta"><div className="texto"><p>¿No tenés cuenta?</p></div></div><div className="botones"><Link href="/register" className="cont-boton"><div className="boton"><p>Registrate</p></div></Link></div><Toaster /></section></main>;
}
