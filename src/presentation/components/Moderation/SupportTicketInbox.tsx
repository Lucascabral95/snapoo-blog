"use client";

import { useState } from "react";

type StaffMember = { id: string; label: string };
type Ticket = { id: string; subject: string; message: string; category: string; priority: string; status: "open" | "in_progress" | "resolved" | "closed"; createdAt: string; user: string; assignedTo?: string };

const transitions: Record<Ticket["status"], Ticket["status"][]> = {
  open: ["in_progress", "closed"],
  in_progress: ["resolved", "closed"],
  resolved: ["in_progress", "closed"],
  closed: [],
};

export default function SupportTicketInbox({ initialTickets, staff }: { initialTickets: Ticket[]; staff: StaffMember[] }) {
  const [tickets, setTickets] = useState(initialTickets);
  const [statusFilter, setStatusFilter] = useState<"all" | Ticket["status"]>("all");
  const [message, setMessage] = useState("");
  const visibleTickets = statusFilter === "all" ? tickets : tickets.filter((ticket) => ticket.status === statusFilter);

  async function updateTicket(ticket: Ticket, changes: { status?: Ticket["status"]; assignedTo?: string | null }) {
    setMessage("");
    const response = await fetch(`/api/admin/support/tickets/${ticket.id}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(changes) });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) { setMessage(data.message || "No se pudo actualizar el ticket."); return; }
    setTickets((current) => current.map((item) => item.id === ticket.id ? { ...item, status: changes.status || item.status, assignedTo: changes.assignedTo === undefined ? item.assignedTo : changes.assignedTo || undefined } : item));
    setMessage("Ticket actualizado.");
  }

  return (
    <main style={{ maxWidth: 1100, margin: "40px auto", padding: "0 24px" }}>
      <h1>Soporte</h1>
      <p>Bandeja de tickets de cuentas, seguridad, privacidad y problemas técnicos.</p>
      <label>Estado <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}><option value="all">Todos</option><option value="open">Abierto</option><option value="in_progress">En progreso</option><option value="resolved">Resuelto</option><option value="closed">Cerrado</option></select></label>
      {message && <p role="status">{message}</p>}
      {visibleTickets.length === 0 ? <p>No hay tickets para este filtro.</p> : <ul style={{ listStyle: "none", padding: 0 }}>
        {visibleTickets.map((ticket) => <li key={ticket.id} style={{ borderTop: "1px solid #ddd", padding: "16px 0" }}>
          <strong>{ticket.subject}</strong><p>{ticket.message}</p><small>{ticket.category} · {ticket.priority} · {ticket.user} · {new Date(ticket.createdAt).toLocaleString("es-AR")}</small>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 10 }}>
            <label>Asignado a <select value={ticket.assignedTo || ""} onChange={(event) => updateTicket(ticket, { assignedTo: event.target.value || null })}><option value="">Sin asignar</option>{staff.map((member) => <option key={member.id} value={member.id}>{member.label}</option>)}</select></label>
            <label>Estado <select value={ticket.status} onChange={(event) => updateTicket(ticket, { status: event.target.value as Ticket["status"] })}>{[ticket.status, ...transitions[ticket.status]].map((status) => <option key={status} value={status}>{status}</option>)}</select></label>
          </div>
        </li>)}
      </ul>}
    </main>
  );
}
