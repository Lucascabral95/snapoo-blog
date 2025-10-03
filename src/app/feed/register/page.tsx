import type { Metadata } from "next";
import RegisterContainer from "@/presentation/components/Auth/RegisterContainer";

export const metadata: Metadata = {
  title: "Registro | Snapoo",
  description: "Crea una cuenta en Snapoo y comienza a compartir tus momentos",
};

export default function RegisterPage() {
  return <RegisterContainer />;
}
