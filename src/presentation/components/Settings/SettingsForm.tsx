"use client";

import type { PersonalData } from "@/infrastructure/types";
import { Field, Input, Textarea } from "@/presentation/components/UI/Field";
import styles from "./Settings.module.scss";

interface SettingsFormProps {
  formData: PersonalData;
  email: string;
  hayDatos: boolean;
  loading: boolean;
  onChange: (field: keyof PersonalData, value: string | number) => void;
}

export default function SettingsForm({ formData, email, hayDatos, loading, onChange }: SettingsFormProps) {
  return (
    <>
      <div className={styles.row}>
        <Field label="Nombre">
          <Input
            readOnly={hayDatos}
            placeholder={loading ? "Cargando..." : "Nombre"}
            value={formData.nombre}
            onChange={(event) => onChange("nombre", event.target.value)}
            required
          />
        </Field>
        <Field label="Apellido">
          <Input
            readOnly={hayDatos}
            placeholder={loading ? "Cargando..." : "Apellido"}
            value={formData.apellido}
            onChange={(event) => onChange("apellido", event.target.value)}
            required
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Provincia">
          <Input
            readOnly={hayDatos}
            placeholder={loading ? "Cargando..." : "Buenos Aires"}
            value={formData.provincia}
            onChange={(event) => onChange("provincia", event.target.value)}
            required
          />
        </Field>
        <Field label="País">
          <Input
            readOnly={hayDatos}
            placeholder={loading ? "Cargando..." : "Argentina"}
            value={formData.pais}
            onChange={(event) => onChange("pais", event.target.value)}
            required
          />
        </Field>
      </div>

      <div className={styles.row}>
        <Field label="Edad">
          <Input
            type="number"
            readOnly={hayDatos}
            placeholder={loading ? "Cargando..." : "22"}
            value={formData.edad || ""}
            onChange={(event) => onChange("edad", parseInt(event.target.value, 10) || 0)}
            required
          />
        </Field>
        <Field label="Email">
          <Input readOnly value={email} />
        </Field>
      </div>

      <Field label="Bio">
        <Textarea
          rows={3}
          readOnly={hayDatos}
          value={formData.bio}
          onChange={(event) => onChange("bio", event.target.value)}
          placeholder={loading ? "Cargando..." : "Contá algo sobre vos"}
        />
      </Field>
    </>
  );
}
