"use client";

import { FormEvent, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useProfileSettings } from "@/presentation/hooks/useProfileSettings";
import Card from "@/presentation/components/UI/Card";
import Button from "@/presentation/components/UI/Button";
import Tabs from "@/presentation/components/UI/Tabs";
import { CheckboxRow, Field, Input, Select, Textarea } from "@/presentation/components/UI/Field";
import SettingsHeader from "./SettingsHeader";
import SettingsForm from "./SettingsForm";
import styles from "./Settings.module.scss";

type DeviceSession = { id: string; device: string; createdAt: string; lastActiveAt: string; current: boolean };
type Ticket = { _id: string; subject: string; category: string; priority: string; status: string; createdAt: string };
class ApiError extends Error { constructor(message: string, readonly code?: string) { super(message); } }

async function request(path: string, options?: RequestInit) {
  const response = await fetch(path, { ...options, headers: { "Content-Type": "application/json", ...(options?.headers || {}) } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(data.message || "No se pudo completar la acción.", data.code);
  return data;
}

export default function SettingsContainer() {
  const profile = useProfileSettings();
  const { data: authSession } = useSession();
  const [tab, setTab] = useState("profile");
  const [reauthToken, setReauthToken] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [sessions, setSessions] = useState<DeviceSession[]>([]);
  const [privacy, setPrivacy] = useState({ isPrivate: false, acceptsMessages: true });
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticket, setTicket] = useState({ category: "account", priority: "normal", subject: "", message: "" });
  const secureHeaders: Record<string, string> = reauthToken ? { "x-reauthentication-token": reauthToken } : {};

  const loadSessions = () => request("/api/account/sessions").then((data) => setSessions(data.result)).catch(() => setSessions([]));
  const loadPrivacy = () => request("/api/account/privacy").then((data) => setPrivacy(data.preferences)).catch(() => undefined);
  const loadTickets = () => request("/api/support/tickets").then((data) => setTickets(data.result)).catch(() => setTickets([]));

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedTab = params.get("tab");
    if (["profile", "security", "privacy", "support"].includes(requestedTab || "")) setTab(requestedTab as string);
    const emailToken = params.get("emailToken");
    if (emailToken) {
      request("/api/account/email/verify", { method: "POST", body: JSON.stringify({ token: emailToken }) })
        .then(() => { toast.success("Email actualizado."); window.history.replaceState({}, "", "/feed/ajustes"); })
        .catch((error) => toast.error(error.message));
    }
  }, []);

  useEffect(() => {
    if (authSession?.user?.reauthenticationToken) {
      setReauthToken(authSession.user.reauthenticationToken);
      setTab("security");
      toast.success("Identidad confirmada con Google por 10 minutos.");
    }
  }, [authSession?.user?.reauthenticationToken]);

  useEffect(() => {
    if (tab === "security") loadSessions();
    if (tab === "privacy") loadPrivacy();
    if (tab === "support") loadTickets();
  }, [tab]);

  async function startGoogleReauthentication() {
    await signIn("google", { callbackUrl: "/feed/ajustes?tab=security" }, { prompt: "login", max_age: "0" });
  }

  async function reauthenticate(event: FormEvent) {
    event.preventDefault();
    try {
      const data = await request("/api/account/reauthenticate", { method: "POST", body: JSON.stringify({ password: currentPassword }) });
      setReauthToken(data.token);
      setCurrentPassword("");
      toast.success("Identidad confirmada por 10 minutos.");
    } catch (error) {
      if (error instanceof ApiError && error.code === "GOOGLE_REAUTH_REQUIRED") { await startGoogleReauthentication(); return; }
      toast.error(error instanceof Error ? error.message : "No se pudo confirmar la identidad.");
    }
  }

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    try {
      await request("/api/account/password", { method: "POST", headers: secureHeaders, body: JSON.stringify({ currentPassword, password: newPassword }) });
      setNewPassword("");
      toast.success("Contraseña actualizada.");
      loadSessions();
    } catch (error) { toast.error(error instanceof Error ? error.message : "No se pudo actualizar."); }
  }

  async function changeEmail(event: FormEvent) {
    event.preventDefault();
    try {
      await request("/api/account/email", { method: "POST", headers: secureHeaders, body: JSON.stringify({ email: newEmail }) });
      setNewEmail("");
      toast.success("Revisá la casilla del nuevo email.");
    } catch (error) { toast.error(error instanceof Error ? error.message : "No se pudo iniciar el cambio."); }
  }

  async function updatePrivacy(event: FormEvent) {
    event.preventDefault();
    try { await request("/api/account/privacy", { method: "PATCH", body: JSON.stringify(privacy) }); toast.success("Preferencias guardadas."); }
    catch (error) { toast.error(error instanceof Error ? error.message : "No se pudo guardar."); }
  }

  async function createTicket(event: FormEvent) {
    event.preventDefault();
    try {
      await request("/api/support/tickets", { method: "POST", body: JSON.stringify(ticket) });
      setTicket({ category: "account", priority: "normal", subject: "", message: "" });
      toast.success("Ticket enviado.");
      loadTickets();
    } catch (error) { toast.error(error instanceof Error ? error.message : "No se pudo enviar el ticket."); }
  }

  async function deactivate() {
    if (!confirm("¿Desactivar tu cuenta durante 30 días?")) return;
    try { await request("/api/account/deactivate", { method: "POST", headers: secureHeaders }); toast.success("Cuenta desactivada."); }
    catch (error) { toast.error(error instanceof Error ? error.message : "No se pudo desactivar."); }
  }

  return (
    <div className={styles.page}>
      <SettingsHeader />
      <Tabs items={[{ key: "profile", label: "Perfil" }, { key: "security", label: "Seguridad" }, { key: "privacy", label: "Privacidad" }, { key: "support", label: "Soporte" }]} activeKey={tab} onChange={setTab} className={styles.tabs} />
      {tab === "profile" && <Card className={styles.card}><SettingsForm formData={profile.formData} email={profile.email} hayDatos={profile.hayDatos} loading={profile.loading} onChange={profile.handleChange} /><div className={styles.actions}><Button variant={profile.hayDatos ? "secondary" : "primary"} onClick={profile.hayDatos ? profile.handleReset : profile.handleSubmit}>{profile.hayDatos ? "Restablecer datos" : "Guardar cambios"}</Button></div></Card>}
      {tab === "security" && <div className={styles.stack}>
        <Card className={styles.card}><h2>Confirmar identidad</h2><p>Las acciones sensibles quedan habilitadas durante 10 minutos.</p><form onSubmit={reauthenticate} className={styles.inlineForm}><Field label="Contraseña actual"><Input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} required /></Field><Button type="submit">Confirmar con contraseña</Button></form><Button variant="secondary" onClick={startGoogleReauthentication}>Confirmar con Google</Button></Card>
        <Card className={styles.card}><h2>Contraseña y email</h2><form onSubmit={changePassword} className={styles.inlineForm}><Field label="Nueva contraseña"><Input type="password" minLength={12} value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></Field><Button type="submit" disabled={!reauthToken}>Cambiar contraseña</Button></form><form onSubmit={changeEmail} className={styles.inlineForm}><Field label="Nuevo email"><Input type="email" value={newEmail} onChange={(event) => setNewEmail(event.target.value)} required /></Field><Button type="submit" disabled={!reauthToken}>Enviar confirmación</Button></form></Card>
        <Card className={styles.card}><h2>Dispositivos activos</h2>{sessions.map((session) => <div className={styles.session} key={session.id}><span><strong>{session.device}</strong>{session.current && " · Este dispositivo"}<small>Actividad: {new Date(session.lastActiveAt).toLocaleString("es-AR")}</small></span>{!session.current && <Button size="sm" variant="secondary" onClick={() => request(`/api/account/sessions/${session.id}`, { method: "DELETE" }).then(loadSessions).catch((error) => toast.error(error.message))}>Revocar</Button>}</div>)}<Button variant="secondary" onClick={() => request("/api/account/sessions", { method: "DELETE" }).then(() => { toast.success("Otras sesiones cerradas."); loadSessions(); }).catch((error) => toast.error(error.message))}>Cerrar otras sesiones</Button></Card>
      </div>}
      {tab === "privacy" && <div className={styles.stack}><Card className={styles.card}><h2>Privacidad</h2><form onSubmit={updatePrivacy}><CheckboxRow checked={privacy.isPrivate} onChange={(event) => setPrivacy({ ...privacy, isPrivate: event.target.checked })}>Perfil privado</CheckboxRow><CheckboxRow checked={privacy.acceptsMessages} onChange={(event) => setPrivacy({ ...privacy, acceptsMessages: event.target.checked })}>Permitir mensajes cuando estén disponibles</CheckboxRow><div className={styles.actions}><Button type="submit">Guardar preferencias</Button></div></form></Card><Card className={styles.card}><h2>Tus datos</h2><Button href="/api/account/export">Descargar exportación JSON</Button></Card><Card className={styles.card}><h2>Desactivar cuenta</h2><p>Oculta tu perfil y contenido. Podés reactivarla dentro de 30 días.</p><Button variant="danger" disabled={!reauthToken} onClick={deactivate}>Desactivar cuenta</Button></Card></div>}
      {tab === "support" && <div className={styles.stack}><Card className={styles.card}><h2>Crear ticket</h2><form onSubmit={createTicket} className={styles.ticketForm}><Field label="Categoría"><Select value={ticket.category} onChange={(event) => setTicket({ ...ticket, category: event.target.value })}><option value="account">Cuenta</option><option value="security">Seguridad</option><option value="privacy">Privacidad</option><option value="technical">Técnico</option><option value="other">Otro</option></Select></Field><Field label="Prioridad"><Select value={ticket.priority} onChange={(event) => setTicket({ ...ticket, priority: event.target.value })}><option value="normal">Normal</option><option value="high">Alta</option></Select></Field><Field label="Asunto"><Input value={ticket.subject} onChange={(event) => setTicket({ ...ticket, subject: event.target.value })} minLength={3} required /></Field><Field label="Mensaje"><Textarea value={ticket.message} onChange={(event) => setTicket({ ...ticket, message: event.target.value })} minLength={10} rows={5} required /></Field><Button type="submit">Enviar ticket</Button></form></Card><Card className={styles.card}><h2>Mis tickets</h2>{tickets.length ? tickets.map((item) => <div className={styles.ticket} key={item._id}><strong>{item.subject}</strong><span>{item.category} · {item.priority} · {item.status}</span></div>) : <p>No tenés tickets todavía.</p>}</Card></div>}
    </div>
  );
}
