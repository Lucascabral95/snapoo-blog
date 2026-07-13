"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import "./Login.scss";

export default function OtpVerification({ email }: { email: string }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    const response = await fetch("/api/auth/register/verify", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, otp }) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setMessage(data.message || "No se pudo verificar el código."); return; }
    router.replace("/login?registered=1");
  }
  return <main className="seccion-perfil-login-register"><section className="contenedor-login-register"><div className="titulo"><p>Confirmá tu email</p></div><p className="caracteres-obligatorios">Ingresá el código enviado a {email}.</p><form className="contenedor-de-input" onSubmit={submit}><div className="contenedor-input"><div className="label"><label htmlFor="otp">Código de seis dígitos</label></div><input id="otp" inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ""))} required /></div><div className="contenedor-de-logueo"><button type="submit" disabled={loading || otp.length !== 6}>{loading ? "Verificando…" : "Crear cuenta"}</button></div></form>{message && <p className="error" role="alert">{message}</p>}</section></main>;
}
