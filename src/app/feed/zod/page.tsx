"use client";
import React, { useState } from "react";
import { z } from "zod";

const UserSchema = z.object({
  nombre: z
    .string()
    .min(3, "El nombre es requerido y debe tener al menos 3 caracteres."),
  email: z.string().email("El email no es valido."),
  edad: z.number().int("La edad debe ser un número entero").nonnegative("La edad debe ser un número positivo."),
});

type User = z.infer<typeof UserSchema>;

const Zod: React.FC = () => {
  const [datos, setDatos] = useState<User>({
    nombre: "",
    email: "",
    edad: 0,
  });
  const [error, setError] = useState<{ [key: string]: string | undefined }>({});

  const probar = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = UserSchema.safeParse(datos);

    if (result.success) {
      setDatos({ nombre: "", email: "", edad: 0 });
      setError({});
      console.log("Datos válidos:", result.data);
    } else {
      const formattedErrors: { [key: string]: string | undefined } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          formattedErrors[err.path[0] as string] = err.message;
        }
      });
      setError(formattedErrors);
      console.log(formattedErrors);
    }
  };

  return (
    <div>
      <h2 style={{ margin: "20px 0 40px 0" }}>Esta es una prueba con Zod</h2>
      <form
        onSubmit={probar}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <input
          type="text"
          placeholder="nombre"
          name="nombre"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
        />
        {error.nombre && <p style={{ color: "red" }}>{error.nombre}</p>}

        <input
          type="email"
          placeholder="email"
          name="email"
          value={datos.email}
          onChange={(e) => setDatos({ ...datos, email: e.target.value })}
        />
        {error.email && <p style={{ color: "red" }}>{error.email}</p>}

        <input
          type="number"
          placeholder="edad"
          name="edad"
          value={datos.edad}
          onChange={(e) => setDatos({ ...datos, edad: Number(e.target.value) })}
        />
        {error.edad && <p style={{ color: "red" }}>{error.edad}</p>}

        <button type="submit">Probar Zod</button>
      </form>
    </div>
  );
};

export default Zod;
