import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import Usuarios from "@/models/Usuario";
import { getStaffUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

const schema = z.object({ role: z.enum(["user", "moderator", "admin"]) });

export async function GET() {
  const staff = await getStaffUser();
  if (!staff || staff.role !== "admin") return NextResponse.json({ code: "FORBIDDEN", message: "Solo admins pueden gestionar roles." }, { status: 403 });
  await mongo();
  const result = await Usuarios.find().select("userName email role accountStatus").sort({ userName: 1 }).limit(200).lean();
  return NextResponse.json({ result });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const staff = await getStaffUser();
  if (!staff || staff.role !== "admin") return NextResponse.json({ code: "FORBIDDEN", message: "Solo admins pueden gestionar roles." }, { status: 403 });
  const { id } = await params;
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!mongoose.isValidObjectId(id) || !parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Datos inválidos." }, { status: 400 });
  if (id === staff.id) return NextResponse.json({ code: "FORBIDDEN", message: "No podés modificar tu propio rol." }, { status: 403 });
  await mongo();
  const result = await Usuarios.findByIdAndUpdate(id, { $set: { role: parsed.data.role } }, { new: true }).select("userName email role accountStatus").lean();
  return result ? NextResponse.json({ result }) : NextResponse.json({ code: "NOT_FOUND", message: "Usuario no encontrado." }, { status: 404 });
}
