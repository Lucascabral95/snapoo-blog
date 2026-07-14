import { NextResponse } from "next/server";
import mongoose from "mongoose";
import UserBlock from "@/models/UserBlock";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function DELETE(_: Request, { params }: { params: Promise<{ userId: string }> }) {
  const user = await getActiveAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
  const { userId } = await params;
  if (!mongoose.isValidObjectId(userId)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Usuario inválido." }, { status: 400 });
  await mongo();
  await UserBlock.deleteOne({ blocker: user.id, blocked: userId });
  return NextResponse.json({ message: "Usuario desbloqueado." });
}
