"use client";

import { useState } from "react";

type TargetType = "post" | "comment" | "user";

const reasons = [
  ["spam_scam", "Spam o estafa"],
  ["harassment", "Acoso"],
  ["hate_discrimination", "Odio o discriminación"],
  ["sexual_content", "Contenido sexual"],
  ["violence_threats", "Violencia o amenazas"],
  ["child_safety", "Seguridad infantil"],
  ["self_harm", "Autolesión"],
  ["intellectual_property", "Propiedad intelectual"],
  ["other", "Otro"],
] as const;

export default function ModerationMenu({ targetType, targetId, userId }: { targetType: TargetType; targetId: string; userId?: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<(typeof reasons)[number][0]>("spam_scam");
  const [details, setDetails] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function report() {
    setLoading(true);
    const response = await fetch("/api/reports", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ targetType, targetId, reason, details }) });
    const data = await response.json();
    setMessage(data.message || "No se pudo registrar la denuncia.");
    setLoading(false);
  }

  async function block() {
    if (!userId) return;
    setLoading(true);
    const response = await fetch("/api/blocks", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ userId }) });
    const data = await response.json();
    setMessage(data.message || "No se pudo bloquear al usuario.");
    setLoading(false);
  }

  return (
    <div>
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open}>?</button>
      {open && <div role="dialog" aria-label="Opciones de moderación">
        <button type="button" onClick={block} disabled={!userId || loading}>Bloquear usuario</button>
        <label>Motivo de denuncia
          <select value={reason} onChange={(event) => setReason(event.target.value as typeof reason)}>
            {reasons.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
        </label>
        <textarea value={details} onChange={(event) => setDetails(event.target.value)} maxLength={1500} placeholder="Detalle opcional" />
        <button type="button" onClick={report} disabled={loading}>Denunciar</button>
        {message && <p role="status">{message}</p>}
      </div>}
    </div>
  );
}
