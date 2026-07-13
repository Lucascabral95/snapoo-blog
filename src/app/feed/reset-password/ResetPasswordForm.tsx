"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Field, Input } from "@/presentation/components/UI/Field";
import Button from "@/presentation/components/UI/Button";
import AuthShell from "@/presentation/components/Auth/AuthShell";
import authStyles from "@/presentation/components/Auth/Auth.module.scss";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, password }),
    });
    const data = await response.json();
    setSuccess(response.ok);
    setMessage(data.message || "No se pudo actualizar la contraseña.");
    setLoading(false);
  }

  return (
    <AuthShell
      brandTitle="Encontrá tu inspiración"
      brandSubtitle="Unite a nuestra comunidad de creadores visuales y explorá un mundo de posibilidades."
    >
      <div>
        <h1 className={authStyles.title}>Nueva contraseña</h1>
        <p className={authStyles.subtitle}>Elegí una contraseña nueva para tu cuenta.</p>
      </div>

      {message && (
        <div className={success ? authStyles.successBanner : authStyles.alertBanner} role="alert">
          {success ? <CheckCircle2 size={15} /> : <AlertCircle size={15} />}
          {message}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <Field label="Contraseña" hint="Usá entre 12 y 128 caracteres.">
          <Input
            type="password"
            autoComplete="new-password"
            minLength={12}
            maxLength={128}
            placeholder="Mínimo 12 caracteres"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </Field>

        <Button type="submit" variant="primary" block disabled={loading} style={{ marginTop: 4 }}>
          {loading ? "Actualizando..." : "Actualizar contraseña"}
        </Button>
      </form>

      <p className={authStyles.foot}>
        <Link href="/login" className={authStyles.link}>
          Volver a iniciar sesión
        </Link>
      </p>
    </AuthShell>
  );
}
