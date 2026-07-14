import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import Posteos from "@/models/Posteos";
import Comentarios from "@/models/Comentarios";
import Usuarios from "@/models/Usuario";
import ModerationReport, { REPORT_REASONS, REPORT_TARGET_TYPES } from "@/models/ModerationReport";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import { CRITICAL_REPORT_REASONS } from "@/infrastructure/moderation/config";
import mongo from "@/services/mongoDB";

const schema = z.object({
  targetType: z.enum(REPORT_TARGET_TYPES),
  targetId: z.string().refine((value) => mongoose.isValidObjectId(value)),
  reason: z.enum(REPORT_REASONS),
  details: z.string().trim().max(1500).optional(),
});

async function findTarget(targetType: z.infer<typeof schema>["targetType"], targetId: string) {
  if (targetType === "post") return Posteos.findById(targetId).populate("usuario", "userName email").lean();
  if (targetType === "comment") return Comentarios.findById(targetId).populate("usuario", "userName email").lean();
  return Usuarios.findById(targetId).select("userName email avatar").lean();
}

export async function POST(request: Request) {
  const reporter = await getAuthenticatedUser();
  if (!reporter) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });

  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La denuncia no es válida." }, { status: 400 });

  await mongo();
  const target = await findTarget(parsed.data.targetType, parsed.data.targetId) as { _id: unknown; usuario?: { _id: unknown } } | null;
  if (!target) return NextResponse.json({ code: "NOT_FOUND", message: "El contenido no existe." }, { status: 404 });

  const targetAuthor = parsed.data.targetType === "user" ? target : target.usuario;
  if (!targetAuthor || String(targetAuthor._id) === reporter.id) {
    return NextResponse.json({ code: "INVALID_TARGET", message: "No podés denunciar tu propio contenido." }, { status: 400 });
  }

  try {
    const report = await ModerationReport.create({
      reporter: reporter.id,
      targetType: parsed.data.targetType,
      targetId: parsed.data.targetId,
      targetAuthor: targetAuthor._id,
      reason: parsed.data.reason,
      details: parsed.data.details || undefined,
      targetSnapshot: target,
      priority: CRITICAL_REPORT_REASONS.has(parsed.data.reason) ? "critical" : "normal",
    });
    return NextResponse.json({ result: { id: String(report._id), status: report.status }, message: "Recibimos tu denuncia." }, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message.includes("duplicate key")) {
      return NextResponse.json({ code: "REPORT_ALREADY_OPEN", message: "Ya denunciaste este contenido." }, { status: 409 });
    }
    console.error("Report creation failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "REPORT_CREATE_ERROR", message: "No se pudo registrar la denuncia." }, { status: 500 });
  }
}
