"use client";

import Link from "next/link";
import { useLoginForm } from "@/presentation/hooks/useLoginForm";
import AuthShell from "./AuthShell";
import LoginForm from "./LoginForm";
import SocialLogin from "./SocialLogin";
import authStyles from "./Auth.module.scss";

export default function LoginContainer() {
  const { formData, errors, isLoading, handleChange, handleSubmit } = useLoginForm();

  return (
    <AuthShell
      brandTitle="Encontrá tu inspiración"
      brandSubtitle="Unite a nuestra comunidad de creadores visuales y explorá un mundo de posibilidades."
    >
      <div>
        <h1 className={authStyles.title}>Iniciá sesión</h1>
        <p className={authStyles.subtitle}>Qué bueno verte de nuevo</p>
      </div>

      <LoginForm
        formData={formData}
        errors={errors}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />

      <span className={authStyles.divider}>o continuá con</span>

      <SocialLogin />

      <p className={authStyles.foot}>
        ¿No tenés cuenta?{" "}
        <Link href="/register" className={authStyles.link}>
          Registrate
        </Link>
      </p>
    </AuthShell>
  );
}
