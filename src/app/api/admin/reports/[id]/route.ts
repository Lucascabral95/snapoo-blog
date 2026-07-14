import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import ModerationReport from "@/models/ModerationReport";
import ModerationAction from "@/models/ModerationAction";
import UserNotification from "@/models/UserNotification";
import Posteos from "@/models/Posteos";
import Comentarios from "@/models/Comentarios";
import Usuarios from "@/models/Usuario";
import { getStaffUser } from "@/infrastructure/auth/session";
import { MODERATOR_SUSPENSION_DAYS } from "@/infrastructure/moderation/config";
import mongo from "@/services/mongoDB";

const actionSchema = z.object({
  type: z.enum(["dismiss", "remove_content", "suspend_account"]),
  reason: z.string().trim().min(3).max(160),
  internalNote: z.string().trim().min(3).max(1000),
  suspensionDays: z.number().int().positive().max(3650).optional(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaffUser();
  if (!staff) return NextResponse.json({ code: "FORBIDDEN", message: "Acceso restringido." }, { status: 403 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Reporte inválido." }, { status: 400 });
  await mongo();
  const result = await ModerationReport.findById(id).populate("reporter targetAuthor assignedTo", "userName email avatar").lean();
  return result ? NextResponse.json({ result }) : NextResponse.json({ code: "NOT_FOUND", message: "Reporte no encontrado." }, { status: 404 });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaffUser();
  if (!staff) return NextResponse.json({ code: "FORBIDDEN", message: "Acceso restringido." }, { status: 403 });
  const { id } = await params;
  await mongo();
  const result = await ModerationReport.findOneAndUpdate({ _id: id, status: { $in: ["open", "in_review"] } }, { $set: { status: "in_review", assignedTo: staff.id } }, { new: true }).lean();
  return result ? NextResponse.json({ result }) : NextResponse.json({ code: "NOT_FOUND", message: "Reporte no disponible." }, { status: 404 });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaffUser();
  if (!staff) return NextResponse.json({ code: "FORBIDDEN", message: "Acceso restringido." }, { status: 403 });
  const parsed = actionSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La acción no es válida." }, { status: 400 });
  const { id } = await params;
  if (!mongoose.isValidObjectId(id)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Reporte inválido." }, { status: 400 });
  await mongo();
  const report = await ModerationReport.findOne({ _id: id, status: { $in: ["open", "in_review"] } }).lean() as { _id: unknown; targetId: unknown; targetType: "post" | "comment" | "user"; targetAuthor: unknown } | null;
  if (!report) return NextResponse.json({ code: "NOT_FOUND", message: "Reporte no disponible." }, { status: 404 });
  if (parsed.data.type === "suspend_account" && staff.role === "moderator" && parsed.data.suspensionDays && !MODERATOR_SUSPENSION_DAYS.includes(parsed.data.suspensionDays as 1 | 7 | 30)) {
    return NextResponse.json({ code: "FORBIDDEN", message: "El plazo no está permitido para moderators." }, { status: 403 });
  }
  if (parsed.data.type === "remove_content") {
    const filter = { _id: report.targetId };
    if (report.targetType === "post") await Posteos.updateOne(filter, { $set: { moderationState: "removed", removedAt: new Date(), removedBy: staff.id, removalReason: parsed.data.reason } });
    if (report.targetType === "comment") await Comentarios.updateOne(filter, { $set: { moderationState: "removed", removedAt: new Date(), removedBy: staff.id, removalReason: parsed.data.reason } });
  }
  if (parsed.data.type === "suspend_account") {
    const suspendedUntil = parsed.data.suspensionDays ? new Date(Date.now() + parsed.data.suspensionDays * 86400000) : undefined;
    if (staff.role === "moderator" && !suspendedUntil) return NextResponse.json({ code: "FORBIDDEN", message: "Moderator no puede aplicar una suspensión indefinida." }, { status: 403 });
    await Usuarios.updateOne({ _id: report.targetAuthor }, { $set: { accountStatus: "suspended", suspendedUntil, suspensionReason: parsed.data.reason } });
    await UserNotification.create({ recipient: report.targetAuthor, type: "moderation_action", title: "Medida aplicada a tu cuenta", body: parsed.data.reason, expiresAt: new Date(Date.now() + 90 * 86400000) });
  }
  await ModerationAction.create({ report: report._id, actor: staff.id, targetType: report.targetType, targetId: report.targetId, type: parsed.data.type, reason: parsed.data.reason, internalNote: parsed.data.internalNote, retentionUntil: new Date(Date.now() + 730 * 86400000) });
  const status = parsed.data.type === "dismiss" ? "dismissed" : "resolved";
  const result = await ModerationReport.findByIdAndUpdate(report._id, { $set: { status, closedAt: new Date(), retentionUntil: new Date(Date.now() + 730 * 86400000) } }, { new: true }).lean();
  return NextResponse.json({ result });
}
