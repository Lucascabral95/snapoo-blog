"use client";
import React, { useState } from "react";
import "../login/Login.scss";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { z } from "zod";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const RegisterSchema = z.object({
  email: z.string().email("El email no es valido."),
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres.")
    .regex(
      /[.,!?;:(){}[\]'"`~@#$%^&*-_]/,
      "La contraseña debe contener al menos un carácter de puntuación."
    ),
});

type User = z.infer<typeof RegisterSchema>;

const Register = () => {
  const [acceso, setAcceso] = useState<User>({
    email: "",
    password: "",
  });

  const [error, setError] = useState<{ [key: string]: string | undefined }>({});

  const acceder = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const verificacion = RegisterSchema.safeParse(acceso);

      if (verificacion.success) {
        const result = await axios.post("/api/register", acceso);

        if (result.status === 200 || result.status === 201) {
          setAcceso({ email: "", password: "" });
          setError({});
          toast.success("Registro con éxito", {
            duration: 1500,
            position: "top-center",
          });
          setTimeout(() => {
            window.location.href = "/feed/login";
          }, 1600);
        }
      } else {
        const formattedErrors: { [key: string]: string | undefined } = {};
        verificacion.error.errors.forEach((err) => {
          if (err.path[0]) {
            formattedErrors[err.path[0] as string] = err.message;
          }
        });
        setError(formattedErrors);
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
          <p> Create una cuenta en Snapoo </p>
        </div>

        <form className="contenedor-de-input" onSubmit={acceder}>
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
          {error.email && (
            <div style={{ color: "red" }} className="error">
              {error.email}
            </div>
          )}
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
              name="password"
              id="password"
              required
            />
          </div>
          <p className="caracteres-obligatorios">
            La contraseña debe tener al menos 8 caracteres y contener al menos
            un carácter de puntuación.
          </p>
          {error.password && (
            <div style={{ color: "red" }} className="error">
              {error.password}
            </div>
          )}
          <div className="contenedor-de-logueo">
            <button type="submit"> Registrarte </button>
          </div>

          <Toaster />
        </form>

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
};

export default Register;
