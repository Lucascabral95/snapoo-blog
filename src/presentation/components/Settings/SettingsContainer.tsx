"use client";

import { useProfileSettings } from "@/presentation/hooks/useProfileSettings";
import Card from "@/presentation/components/UI/Card";
import Button from "@/presentation/components/UI/Button";
import SettingsHeader from "./SettingsHeader";
import SettingsForm from "./SettingsForm";
import styles from "./Settings.module.scss";

export default function SettingsContainer() {
  const { formData, email, hayDatos, loading, handleChange, handleSubmit, handleReset } = useProfileSettings();

  return (
    <div className={styles.page}>
      <SettingsHeader />

      <Card className={styles.card}>
        <SettingsForm formData={formData} email={email} hayDatos={hayDatos} loading={loading} onChange={handleChange} />

        <div className={styles.actions}>
          {hayDatos ? (
            <Button variant="secondary" onClick={handleReset}>
              Restablecer datos
            </Button>
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Guardar cambios
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
