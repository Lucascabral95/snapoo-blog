"use client";

import type { FormEvent } from "react";
import Link from "next/link";
import type { LoginUser, AuthFormErrors } from "@/infrastructure/types";
import { Field, Input } from "@/presentation/components/UI/Field";
import Button from "@/presentation/components/UI/Button";
import authStyles from "./Auth.module.scss";

interface LoginFormProps {
  formData: LoginUser;
  errors: AuthFormErrors;
  isLoading?: boolean;
  onSubmit: (event: FormEvent) => void;
  onChange: (field: keyof LoginUser, value: string) => void;
}

export default function LoginForm({
  formData,
  errors,
  isLoading = false,
  onSubmit,
  onChange,
}: LoginFormProps) {
  return (
    <form className={authStyles.form} onSubmit={onSubmit} noValidate aria-busy={isLoading}>
      <Field label="Email" error={errors.email}>
        <Input
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={(event) => onChange("email", event.target.value)}
          required
          disabled={isLoading}
          error={Boolean(errors.email)}
          placeholder="vos@ejemplo.com"
        />
      </Field>

      <Field label="Contraseña" error={errors.password}>
        <Input
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(event) => onChange("password", event.target.value)}
          required
          disabled={isLoading}
          error={Boolean(errors.password)}
          placeholder="••••••••"
        />
      </Field>

      <div className={authStyles.row}>
        <Link href="/feed/forgot-password" className={authStyles.link}>
          ¿Olvidaste tu contraseña?
        </Link>
      </div>

      <Button type="submit" variant="primary" block disabled={isLoading}>
        {isLoading ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>
    </form>
  );
}
