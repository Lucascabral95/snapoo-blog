import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import SupportTicket, { SUPPORT_STATUSES } from "@/models/SupportTicket";
import Usuarios from "@/models/Usuario";
import { getStaffUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
import { ACTIVE_ACCOUNT_FILTER } from "@/infrastructure/account/account-status";

const schema = z.object({ status: z.enum(SUPPORT_STATUSES).optional(), assignedTo: z.string().refine(mongoose.isValidObjectId).nullable().optional() }).refine((data) => data.status !== undefined || data.assignedTo !== undefined);
const allowedTransitions: Record<string, string[]> = { open: ["in_progress", "closed"], in_progress: ["resolved", "closed"], resolved: ["closed", "in_progress"], closed: [] };

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaffUser();
  if (!staff) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 });
  await mongo();
  const ticket = await SupportTicket.findById(id);
  if (!ticket) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 });
  if (parsed.data.status && !allowedTransitions[ticket.status].includes(parsed.data.status)) return NextResponse.json({ code: "INVALID_TRANSITION" }, { status: 409 });
  if (parsed.data.assignedTo) {
    const assignee = await Usuarios.exists({ _id: parsed.data.assignedTo, role: { $in: ["moderator", "admin"] }, ...ACTIVE_ACCOUNT_FILTER });
    if (!assignee) return NextResponse.json({ code: "INVALID_ASSIGNEE" }, { status: 400 });
  }
  if (parsed.data.status) {
    ticket.status = parsed.data.status;
    if (parsed.data.status === "resolved") ticket.resolvedAt = new Date();
    if (parsed.data.status === "closed") ticket.closedAt = new Date();
  }
  if (parsed.data.assignedTo !== undefined) ticket.assignedTo = parsed.data.assignedTo || undefined;
  await ticket.save();
  return NextResponse.json({ result: ticket });
}
