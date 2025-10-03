import type { Metadata } from "next";
import LoginContainer from "@/presentation/components/Auth/LoginContainer";

export const metadata: Metadata = {
  title: "Iniciar sesión | Snapoo",
  description: "Inicia sesión en Snapoo y continúa compartiendo tus momentos",
};

export default function LoginPage() {
  return <LoginContainer />;
}
