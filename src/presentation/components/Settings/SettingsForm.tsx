"use client";

import React from "react";
import type { PersonalData } from "@/infrastructure/types";

interface SettingsFormProps {
  formData: PersonalData;
  email: string;
  hayDatos: boolean;
  loading: boolean;
  onChange: (field: keyof PersonalData, value: string | number) => void;
}

export default function SettingsForm({
  formData,
  email,
  hayDatos,
  loading,
  onChange,
}: SettingsFormProps) {
  return (
    <>
      <div className="contenedor-doble-input">
        <div className="inp">
          <div className="label">
            <label htmlFor="nombre">Nombre</label>
          </div>
          <div className="input">
            <input
              type="text"
              id="nombre"
              name="nombre"
              readOnly={hayDatos}
              placeholder={loading ? "Cargando..." : "Nombre"}
              value={formData.nombre}
              onChange={(e) => onChange("nombre", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inp">
          <div className="label">
            <label htmlFor="apellido">Apellido</label>
          </div>
          <div className="input">
            <input
              type="text"
              name="apellido"
              id="apellido"
              readOnly={hayDatos}
              placeholder={loading ? "Cargando..." : "Apellido"}
              value={formData.apellido}
              onChange={(e) => onChange("apellido", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="contenedor-doble-input">
        <div className="inp">
          <div className="label">
            <label htmlFor="provincia">Provincia</label>
          </div>
          <div className="input">
            <input
              type="text"
              id="provincia"
              readOnly={hayDatos}
              name="provincia"
              placeholder={loading ? "Cargando..." : "Buenos Aires"}
              value={formData.provincia}
              onChange={(e) => onChange("provincia", e.target.value)}
              required
            />
          </div>
        </div>
        <div className="inp">
          <div className="label">
            <label htmlFor="pais">País</label>
          </div>
          <div className="input">
            <input
              type="text"
              readOnly={hayDatos}
              name="pais"
              id="pais"
              placeholder={loading ? "Cargando..." : "Argentina"}
              value={formData.pais}
              onChange={(e) => onChange("pais", e.target.value)}
              required
            />
          </div>
        </div>
      </div>

      <div className="contenedor-doble-input">
        <div className="inp">
          <div className="label">
            <label htmlFor="edad">Edad</label>
          </div>
          <div className="input">
            <input
              type="number"
              id="edad"
              readOnly={hayDatos}
              name="edad"
              placeholder={loading ? "Cargando..." : "22"}
              value={formData.edad}
              onChange={(e) => onChange("edad", parseInt(e.target.value))}
              required
            />
          </div>
        </div>
        <div className="inp">
          <div className="label">
            <label htmlFor="email">Email</label>
          </div>
          <div className="input">
            <input
              type="email"
              name="email"
              id="email"
              readOnly
              value={email}
              placeholder="Lucas@hotmail.com"
            />
          </div>
        </div>
      </div>

      <div className="contenedor-textarea">
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          readOnly={hayDatos}
          onChange={(e) => onChange("bio", e.target.value)}
          placeholder={loading ? "Cargando..." : "Contá algo sobre vos"}
        />
      </div>
    </>
  );
}
