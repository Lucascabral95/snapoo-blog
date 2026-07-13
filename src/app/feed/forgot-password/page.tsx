"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Field, Input } from "@/presentation/components/UI/Field";
import Button from "@/presentation/components/UI/Button";
import AuthShell from "@/presentation/components/Auth/AuthShell";
import authStyles from "@/presentation/components/Auth/Auth.module.scss";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();
    setMessage(data.message || "Revisá tu email.");
    setLoading(false);
  }

  return (
    <AuthShell
      brandTitle="Encontrá tu inspiración"
      brandSubtitle="Unite a nuestra comunidad de creadores visuales y explorá un mundo de posibilidades."
    >
      <div>
        <h1 className={authStyles.title}>Recuperar contraseña</h1>
        <p className={authStyles.subtitle}>Te enviamos instrucciones a tu email para que puedas volver a entrar.</p>
      </div>

      {message && (
        <div className={authStyles.successBanner} role="status">
          <CheckCircle2 size={15} />
          {message}
        </div>
      )}

      <form onSubmit={submit} noValidate>
        <Field label="Email">
          <Input
            type="email"
            autoComplete="email"
            placeholder="vos@ejemplo.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Field>

        <Button type="submit" variant="primary" block disabled={loading} style={{ marginTop: 4 }}>
          {loading ? "Enviando..." : "Enviar instrucciones"}
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
