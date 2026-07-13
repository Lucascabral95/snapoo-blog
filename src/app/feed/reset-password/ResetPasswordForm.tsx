"use client";

import { FormEvent, useState } from "react";

export default function ResetPasswordForm({ token }: { token: string }) {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    const response = await fetch("/api/auth/reset-password", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, password }) });
    const data = await response.json();
    setMessage(data.message || "No se pudo actualizar la contraseña.");
  }
  return <main><h1>Nueva contraseña</h1><form onSubmit={submit}><label htmlFor="password">Contraseña</label><input id="password" type="password" autoComplete="new-password" minLength={12} maxLength={128} value={password} onChange={(event) => setPassword(event.target.value)} required /><button type="submit">Actualizar contraseña</button></form>{message && <p role="status">{message}</p>}</main>;
}
