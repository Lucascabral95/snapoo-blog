import { NextResponse } from "next/server";
import mongoose from "mongoose";
import UserBlock from "@/models/UserBlock";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function DELETE(_: Request, { params }: { params: Promise<{ userId: string }> }) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n requerida." }, { status: 401 });
  const { userId } = await params;
  if (!mongoose.isValidObjectId(userId)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Usuario invÃ¡lido." }, { status: 400 });
  await mongo();
  await UserBlock.deleteOne({ blocker: user.id, blocked: userId });
  return NextResponse.json({ message: "Usuario desbloqueado." });
}
