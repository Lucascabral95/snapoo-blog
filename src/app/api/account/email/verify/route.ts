import { NextResponse } from "next/server";
import { consumeAuthToken } from "@/infrastructure/auth/tokens";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
export async function POST(request: Request) {
  const body = await request.json().catch(() => null); if (typeof body?.token !== "string" || !/^[a-f0-9]{64}$/i.test(body.token)) return NextResponse.json({ code: "INVALID_TOKEN" }, { status: 400 });
  const token = await consumeAuthToken(body.token, "email-change"); if (!token?.pendingEmail) return NextResponse.json({ code: "INVALID_TOKEN", message: "El enlace expiró o ya fue usado." }, { status: 400 });
  await mongo(); if (await Usuarios.exists({ email: token.pendingEmail, _id: { $ne: token.user } })) return NextResponse.json({ code: "EMAIL_IN_USE" }, { status: 409 });
  await Usuarios.updateOne({ _id: token.user }, { $set: { email: token.pendingEmail, emailVerifiedAt: new Date() } });
  return NextResponse.json({ message: "Email actualizado correctamente." });
}
