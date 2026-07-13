"use client";

import { signIn } from "next-auth/react";
import Button from "@/presentation/components/UI/Button";

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.43 3.58v3h3.93c2.3-2.12 3.52-5.24 3.52-8.82z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.93-3c-1.09.73-2.48 1.17-4 1.17-3.08 0-5.68-2.08-6.61-4.88H1.34v3.09C3.31 21.3 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.39 14.38A7.2 7.2 0 0 1 5 12c0-.83.14-1.63.38-2.38V6.53H1.34A11.96 11.96 0 0 0 0 12c0 1.94.46 3.77 1.34 5.47l4.05-3.09z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.45-3.45C17.94 1.19 15.24 0 12 0 7.33 0 3.31 2.7 1.34 6.53l4.05 3.09C6.32 6.82 8.92 4.75 12 4.75z"
      />
    </svg>
  );
}

export default function SocialLogin() {
  return (
    <Button
      type="button"
      variant="secondary"
      block
      icon={<GoogleIcon />}
      onClick={() => signIn("google")}
    >
      Continuar con Google
    </Button>
  );
}
