"use client";

import { useState } from "react";

export default function VerifyEmailForm({ token }: { token: string }) {
  const [message, setMessage] = useState("Confirmá tu email para activar tu cuenta.");
  const [loading, setLoading] = useState(false);
  async function verify() {
    setLoading(true);
    const response = await fetch("/api/auth/verify-email", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token }) });
    const data = await response.json();
    setMessage(data.message || "No se pudo verificar el email.");
    setLoading(false);
  }
  return <main><h1>Verificar email</h1><p>{message}</p><button type="button" onClick={verify} disabled={loading}>{loading ? "Verificando…" : "Verificar cuenta"}</button></main>;
}
