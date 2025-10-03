"use client";

import React from "react";
import type { RegisterUser, RegisterFormErrors } from "@/infrastructure/types";

interface RegisterFormProps {
  formData: RegisterUser;
  errors: RegisterFormErrors;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof RegisterUser, value: string) => void;
}

export default function RegisterForm({
  formData,
  errors,
  onSubmit,
  onChange,
}: RegisterFormProps) {
  return (
    <form className="contenedor-de-input" onSubmit={onSubmit}>
      <div className="contenedor-input">
        <div className="label">
          <label htmlFor="email">Email</label>
        </div>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => onChange("email", e.target.value)}
          placeholder="Ejemplo@hotmail.com"
          id="email"
          required
        />
      </div>
      {errors.email && (
        <div style={{ color: "red" }} className="error">
          {errors.email}
        </div>
      )}

      <div className="contenedor-input">
        <div className="label">
          <label htmlFor="password">Contraseña</label>
        </div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          placeholder="********"
          name="password"
          id="password"
          required
        />
      </div>
      <p className="caracteres-obligatorios">
        La contraseña debe tener al menos 8 caracteres y contener al menos un
        carácter de puntuación.
      </p>
      {errors.password && (
        <div style={{ color: "red" }} className="error">
          {errors.password}
        </div>
      )}

      <div className="contenedor-de-logueo">
        <button type="submit"> Registrarte </button>
      </div>
    </form>
  );
}
