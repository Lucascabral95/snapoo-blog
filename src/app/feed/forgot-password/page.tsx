"use client";

import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/auth/forgot-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    const data = await response.json();
    setMessage(data.message || "Revisá tu email.");
  }
  return <main><h1>Recuperar contraseña</h1><form onSubmit={submit}><label htmlFor="email">Email</label><input id="email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /><button type="submit">Enviar instrucciones</button></form>{message && <p role="status">{message}</p>}</main>;
}
