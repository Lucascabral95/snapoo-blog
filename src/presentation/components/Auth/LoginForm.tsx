"use client";

import React from "react";
import type { LoginUser, AuthFormErrors } from "@/infrastructure/types";

interface LoginFormProps {
  formData: LoginUser;
  errors: AuthFormErrors;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: keyof LoginUser, value: string) => void;
}

export default function LoginForm({
  formData,
  errors,
  onSubmit,
  onChange,
}: LoginFormProps) {
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

      <div className="contenedor-input">
        <div className="label">
          <label htmlFor="password">Contraseña</label>
        </div>
        <input
          type="password"
          value={formData.password}
          onChange={(e) => onChange("password", e.target.value)}
          placeholder="********"
          id="password"
          required
        />
      </div>

      <div className="contenedor-de-logueo">
        <button type="submit"> Iniciar sesión </button>
      </div>
    </form>
  );
}
