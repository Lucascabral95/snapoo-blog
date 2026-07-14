import { redirect } from "next/navigation";
import { getStaffUser } from "@/infrastructure/auth/session";
import SupportTicket from "@/models/SupportTicket";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
import SupportTicketInbox from "@/presentation/components/Moderation/SupportTicketInbox";
import { ACTIVE_ACCOUNT_FILTER } from "@/infrastructure/account/account-status";

export default async function ModerationSupportPage() {
  const staffUser = await getStaffUser();
  if (!staffUser) redirect("/login");
  await mongo();
  const [tickets, staff] = await Promise.all([
    SupportTicket.find().sort({ priority: -1, createdAt: 1 }).limit(100).populate("user assignedTo", "userName email").lean(),
    Usuarios.find({ role: { $in: ["moderator", "admin"] }, ...ACTIVE_ACCOUNT_FILTER }).select("userName email").sort({ userName: 1 }).lean(),
  ]);
  return <SupportTicketInbox initialTickets={tickets.map((ticket: any) => ({ id: String(ticket._id), subject: ticket.subject, message: ticket.message, category: ticket.category, priority: ticket.priority, status: ticket.status, createdAt: ticket.createdAt.toISOString(), user: ticket.user?.userName || ticket.user?.email || "Usuario", assignedTo: ticket.assignedTo?._id ? String(ticket.assignedTo._id) : undefined }))} staff={staff.map((member: any) => ({ id: String(member._id), label: member.userName || member.email }))} />;
}
