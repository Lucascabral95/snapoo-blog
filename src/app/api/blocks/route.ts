import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { z } from "zod";
import UserBlock from "@/models/UserBlock";
import Usuarios from "@/models/Usuario";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

const schema = z.object({ userId: z.string().refine((value) => mongoose.isValidObjectId(value)) });

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n requerida." }, { status: 401 });
  await mongo();
  const result = await UserBlock.find({ blocker: user.id }).populate("blocked", "userName email avatar").lean();
  return NextResponse.json({ result });
}

export async function POST(request: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n requerida." }, { status: 401 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success || parsed.data.userId === user.id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "No se puede bloquear este usuario." }, { status: 400 });
  await mongo();
  if (!await Usuarios.exists({ _id: parsed.data.userId })) return NextResponse.json({ code: "NOT_FOUND", message: "Usuario no encontrado." }, { status: 404 });
  await UserBlock.updateOne({ blocker: user.id, blocked: parsed.data.userId }, { $setOnInsert: { blocker: user.id, blocked: parsed.data.userId } }, { upsert: true });
  return NextResponse.json({ message: "Usuario bloqueado." }, { status: 201 });
}
