"use client";
import React, { useState } from "react";
import "./Login.scss";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { z } from "zod";
import toast, { Toaster } from "react-hot-toast";

const UserShcema = z.object({
  email: z.string(),
  password: z
    .string().min(7, "La contraseña debe tener al menos 8 caracteres.")
});

type User = z.infer<typeof UserShcema>;

const Login: React.FC = () => {
  const [acceso, setAcceso] = useState<User>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<{ [key: string]: string | undefined }>();

  const entrar = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const verificacion = UserShcema.safeParse(acceso);

      if (verificacion.success) {
        const result = await signIn("credentials", {
          email: acceso.email,
          password: acceso.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("El email o la contraseña son incorrectos.", {
            duration: 2500,
            position: "top-center",
          });
        } else if (result?.ok) {
          window.location.href = "/feed";
        } else {
          toast.error("Error al iniciar sesión", {
            duration: 2500,
            position: "top-center",
          });
        }
      } else {
        console.log(verificacion.error.errors);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401 || error.response.status === 400) {
          console.log(error.response.data.error);
          setError({
            email: error.response.data.error,
          });
        } else {
          console.log("Error de servidor o red no disponible.");
        }
      }
    }
  };

  return (
    <div className="seccion-perfil-login-register">
      <div className="contenedor-login-register">
        <div className="titulo">
          <p> Iniciá sesión en Snapoo </p>
        </div>

        <form className="contenedor-de-input" onSubmit={entrar}>
          <div className="contenedor-input">
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>
            <input
              name="email"
              type="email"
              value={acceso.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAcceso({ ...acceso, email: e.target.value })
              }
              placeholder="Ejemplo@hotmail.com"
              id="email"
              required
            />
          </div>
          <div className="contenedor-input">
            <div className="label">
              <label htmlFor="password">Contraseña</label>
            </div>
            <input
              type="password"
              value={acceso.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAcceso({ ...acceso, password: e.target.value })
              }
              placeholder="********"
              id="password"
              required
            />
          </div>
          <div className="contenedor-de-logueo">
            <button type="submit"> Iniciar sesión </button>
          </div>
        </form>

        <Toaster />

        <div className="linea-delimitante">
          <div className="linea"></div>
        </div>

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
};

export default Login;
