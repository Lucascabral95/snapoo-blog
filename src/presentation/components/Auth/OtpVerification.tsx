"use client";

import { FormEvent, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle } from "lucide-react";
import Button from "@/presentation/components/UI/Button";
import AuthShell from "./AuthShell";
import authStyles from "./Auth.module.scss";

const OTP_LENGTH = 6;

export default function OtpVerification({ email }: { email: string }) {
  const router = useRouter();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const otp = digits.join("");

  const handleDigitChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    setDigits(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  async function submit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const response = await fetch("/api/auth/register/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp }),
    });
    const data = await response.json();
    setLoading(false);
    if (!response.ok) {
      setMessage(data.message || "No se pudo verificar el código.");
      return;
    }
    router.replace("/login?registered=1");
  }

  return (
    <AuthShell
      brandTitle="Sumate a la comunidad"
      brandSubtitle="Compartí tus fotos, descubrí creadores y encontrá tu estilo."
    >
      <div>
        <h1 className={authStyles.title}>Verificá tu email</h1>
        <p className={authStyles.subtitle}>
          Te enviamos un código de 6 dígitos a <b>{email}</b>
        </p>
      </div>

      {message && (
        <div className={authStyles.alertBanner} role="alert">
          <AlertCircle size={15} />
          {message}
        </div>
      )}

      <form className={authStyles.form} onSubmit={submit}>
        <div className={authStyles.otpRow}>
          {digits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              className={[authStyles.otpBox, message && authStyles.otpErr].filter(Boolean).join(" ")}
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => handleDigitChange(index, event.target.value)}
              onKeyDown={(event) => handleKeyDown(index, event)}
            />
          ))}
        </div>

        <Button type="submit" variant="primary" block disabled={loading || otp.length !== OTP_LENGTH}>
          {loading ? "Verificando..." : "Verificar código"}
        </Button>
      </form>

      <p className={authStyles.foot}>
        ¿No es tu email?{" "}
        <Link href="/register" className={authStyles.link}>
          Volver
        </Link>
      </p>
    </AuthShell>
  );
}
