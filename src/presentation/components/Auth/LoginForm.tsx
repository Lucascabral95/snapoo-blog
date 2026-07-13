"use client";

import type { FormEvent } from "react";
import type { LoginUser, AuthFormErrors } from "@/infrastructure/types";

interface LoginFormProps {
    formData: LoginUser;
    errors: AuthFormErrors;
    isLoading?: boolean;
    onSubmit: (event: FormEvent) => void;
    onChange: (field: keyof LoginUser, value: string) => void;
}

export default function LoginForm({ formData, errors, isLoading = false, onSubmit, onChange }: LoginFormProps) {
    return (
        <form className="contenedor-de-input" onSubmit={onSubmit} noValidate aria-busy={isLoading}>
            <div className="contenedor-input">
                <div className="label"><label htmlFor="login-email">Email</label></div>
                <input id="login-email" name="email" type="email" autoComplete="email" value={formData.email} onChange={(event) => onChange("email", event.target.value)} required disabled={isLoading} aria-invalid={Boolean(errors.email)} />
                {errors.email && <p className="error" role="alert">{errors.email}</p>}
            </div>
            <div className="contenedor-input">
                <div className="label"><label htmlFor="login-password">Contraseña</label></div>
                <input id="login-password" name="password" type="password" autoComplete="current-password" value={formData.password} onChange={(event) => onChange("password", event.target.value)} required disabled={isLoading} aria-invalid={Boolean(errors.password)} />
                {errors.password && <p className="error" role="alert">{errors.password}</p>}
            </div>
            {isLoading && <p role="status" aria-live="polite">Verificando credenciales...</p>}
            <div className="contenedor-de-logueo"><button type="submit" disabled={isLoading}>{isLoading ? "Iniciando sesion..." : "Iniciar sesion"}</button></div>
        </form>
    );
}
