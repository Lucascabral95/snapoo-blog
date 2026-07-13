"use client";

import React from "react";
import type { RegisterUser, RegisterFormErrors } from "@/infrastructure/types";

interface RegisterFormProps {
  formData: RegisterUser;
  errors: RegisterFormErrors;
  isLoading?: boolean;
  onSubmit: (event: React.FormEvent) => void;
  onChange: (field: keyof RegisterUser, value: string) => void;
}

export default function RegisterForm({ formData, errors, isLoading, onSubmit, onChange }: RegisterFormProps) {
  const field = (name: keyof RegisterUser, label: string, type: string, autocomplete: string) => (
    <div className="contenedor-input">
      <div className="label"><label htmlFor={`register-${name}`}>{label}</label></div>
      <input id={`register-${name}`} name={name} type={type} autoComplete={autocomplete} value={formData[name]} onChange={(event) => onChange(name, event.target.value)} required aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined} />
      {errors[name] && <p id={`error-${name}`} className="error" role="alert">{errors[name]}</p>}
    </div>
  );

  return (
    <form className="contenedor-de-input" onSubmit={onSubmit} noValidate>
      {field('userName', 'Nombre de usuario', 'text', 'username')}
      {field('email', 'Email', 'email', 'email')}
      {field('password', 'Contraseña', 'password', 'new-password')}
      {field('confirmPassword', 'Repetí tu contraseña', 'password', 'new-password')}
      <p className="caracteres-obligatorios">Usá entre 12 y 128 caracteres.</p>
      <div className="contenedor-de-logueo"><button type="submit" disabled={isLoading}>{isLoading ? 'Creando cuenta…' : 'Registrarte'}</button></div>
    </form>
  );
}
