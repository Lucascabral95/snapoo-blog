import type { Metadata } from "next";
import SettingsContainer from "@/presentation/components/Settings/SettingsContainer";

export const metadata: Metadata = {
  title: "Ajustes | Snapoo",
  description: "Configura tu perfil y datos personales en Snapoo",
};

export default function AjustesPage() {
  return <SettingsContainer />;
}
