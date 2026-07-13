"use client";

import { useState } from "react";
import Link from "next/link";
import { MailCheck } from "lucide-react";
import Button from "@/presentation/components/UI/Button";
import AuthShell from "@/presentation/components/Auth/AuthShell";
import authStyles from "@/presentation/components/Auth/Auth.module.scss";

export default function VerifyEmailForm({ token }: { token: string }) {
  const [message, setMessage] = useState("Confirmá tu email para activar tu cuenta.");
  const [loading, setLoading] = useState(false);

  async function verify() {
    setLoading(true);
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });
    const data = await response.json();
    setMessage(data.message || "No se pudo verificar el email.");
    setLoading(false);
  }

  return (
    <AuthShell
      brandTitle="Encontrá tu inspiración"
      brandSubtitle="Unite a nuestra comunidad de creadores visuales y explorá un mundo de posibilidades."
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
        <MailCheck size={32} color="var(--accent)" />
        <h1 className={authStyles.title}>Verificar email</h1>
        <p className={authStyles.subtitle}>{message}</p>
      </div>

      <Button type="button" variant="primary" block onClick={verify} disabled={loading}>
        {loading ? "Verificando..." : "Verificar cuenta"}
      </Button>

      <p className={authStyles.foot}>
        <Link href="/login" className={authStyles.link}>
          Ir a iniciar sesión
        </Link>
      </p>
    </AuthShell>
  );
}
