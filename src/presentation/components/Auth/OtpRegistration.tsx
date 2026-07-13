"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterSchema, type RegisterUser } from "@/infrastructure/types";
import "./Login.scss";

export default function OtpRegistration() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterUser>({ email: "", userName: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = RegisterSchema.safeParse(form);
    if (!parsed.success) { setMessage(parsed.error.issues[0]?.message || "Revisá los datos ingresados."); return; }
    setLoading(true);
    const response = await fetch("/api/auth/register/start", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(parsed.data) });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) { setMessage(data.message || "No se pudo enviar el código."); return; }
    router.push(`/register/verify?email=${encodeURIComponent(parsed.data.email)}`);
  }

  return <main className="seccion-perfil-login-register"><section className="contenedor-login-register"><div className="titulo"><p>Creá tu cuenta en Snapoo</p></div><form className="contenedor-de-input" onSubmit={submit} noValidate>{([['userName','Nombre de usuario','text','username'],['email','Email','email','email'],['password','Contraseña','password','new-password'],['confirmPassword','Repetí tu contraseña','password','new-password']] as const).map(([name,label,type,autoComplete]) => <div className="contenedor-input" key={name}><div className="label"><label htmlFor={name}>{label}</label></div><input id={name} type={type} autoComplete={autoComplete} value={form[name]} onChange={(event) => setForm({ ...form, [name]: event.target.value })} required /></div>)}<p className="caracteres-obligatorios">Te enviaremos un código de seis dígitos para confirmar tu email antes de crear la cuenta.</p><div className="contenedor-de-logueo"><button type="submit" disabled={loading}>{loading ? "Enviando código…" : "Continuar"}</button></div></form>{message && <p className="error" role="alert">{message}</p>}</section></main>;
}
