import { NextResponse } from "next/server";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";

type PrivacyPreferences = { isPrivate?: boolean; acceptsMessages?: boolean };

export async function GET() {
  const user = await getActiveAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  await mongo();
  const result = await Usuarios.findById(user.id).select("isPrivate acceptsMessages").lean() as PrivacyPreferences | null;
  return NextResponse.json({ preferences: { isPrivate: result?.isPrivate || false, acceptsMessages: result?.acceptsMessages !== false } });
}

export async function PATCH(request: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  const body = await request.json().catch(() => null);
  if (typeof body?.isPrivate !== "boolean" || typeof body?.acceptsMessages !== "boolean") return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 });
  await mongo();
  await Usuarios.updateOne({ _id: user.id }, { $set: { isPrivate: body.isPrivate, acceptsMessages: body.acceptsMessages } });
  return NextResponse.json({ preferences: { isPrivate: body.isPrivate, acceptsMessages: body.acceptsMessages } });
}
