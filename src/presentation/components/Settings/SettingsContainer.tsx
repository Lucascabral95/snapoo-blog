"use client";
import React from "react";

import { useProfileSettings } from "@/presentation/hooks/useProfileSettings";
import SettingsHeader from "./SettingsHeader";
import SettingsForm from "./SettingsForm";
import "./Login.scss";

export default function SettingsContainer() {
  const {
    formData,
    email,
    hayDatos,
    loading,
    handleChange,
    handleSubmit,
    handleReset,
  } = useProfileSettings();

  return (
    <div className="seccion-perfil seccion-perfil-c-ajustes">
      <div className="seccion-perfil-ajustes">
        <SettingsHeader />

        <div className="linea-limitadora">
          <div className="linea"></div>
        </div>

        <div className="perfil">
          <p>Mi perfil</p>
        </div>

        <SettingsForm
          formData={formData}
          email={email}
          hayDatos={hayDatos}
          loading={loading}
          onChange={handleChange}
        />

        {hayDatos ? (
          <div className="boton-restablecer-cambios">
            <button onClick={handleReset}>Restablecer datos</button>
          </div>
        ) : (
          <div className="boton-guardar-cambios">
            <button onClick={handleSubmit}>Guardar cambios</button>
          </div>
        )}
      </div>
    </div>
  );
}
