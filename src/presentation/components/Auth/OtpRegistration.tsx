"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import { RegisterSchema, type RegisterUser } from "@/infrastructure/types";
import { Field, Input } from "@/presentation/components/UI/Field";
import Button from "@/presentation/components/UI/Button";
import AuthShell from "./AuthShell";
import SocialLogin from "./SocialLogin";
import authStyles from "./Auth.module.scss";

const FIELDS = [
  { name: "userName", label: "Usuario", type: "text", autoComplete: "username", placeholder: "tu.usuario" },
  { name: "email", label: "Email", type: "email", autoComplete: "email", placeholder: "vos@ejemplo.com" },
  { name: "password", label: "Contraseña", type: "password", autoComplete: "new-password", placeholder: "Mínimo 8 caracteres" },
  { name: "confirmPassword", label: "Repetí tu contraseña", type: "password", autoComplete: "new-password", placeholder: "Mínimo 8 caracteres" },
] as const;

export default function OtpRegistration() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterUser>({ email: "", userName: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const parsed = RegisterSchema.safeParse(form);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message || "Revisá los datos ingresados.");
      return;
    }
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/register/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message || "No se pudo enviar el código.");
      return;
    }
    router.push(`/register/verify?email=${encodeURIComponent(parsed.data.email)}`);
  }

  return (
    <AuthShell
      brandTitle="Sumate a la comunidad"
      brandSubtitle="Compartí tus fotos, descubrí creadores y encontrá tu estilo."
    >
      <div>
        <h1 className={authStyles.title}>Creá tu cuenta</h1>
        <p className={authStyles.subtitle}>Es gratis y te lleva un minuto</p>
      </div>

      {message && (
        <div className={authStyles.alertBanner} role="alert">
          <AlertCircle size={15} />
          {message}
        </div>
      )}

      <form className={authStyles.form} onSubmit={submit} noValidate>
        {FIELDS.map((field) => (
          <Field key={field.name} label={field.label}>
            <Input
              type={field.type}
              autoComplete={field.autoComplete}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
              required
            />
          </Field>
        ))}

        <Button type="submit" variant="primary" block disabled={loading}>
          {loading ? "Enviando código..." : "Crear cuenta"}
        </Button>
      </form>

      <span className={authStyles.divider}>o continuá con</span>

      <SocialLogin />

      <p className={authStyles.foot}>
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className={authStyles.link}>
          Iniciá sesión
        </Link>
      </p>
    </AuthShell>
  );
}
