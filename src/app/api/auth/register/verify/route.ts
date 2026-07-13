import { NextResponse } from "next/server";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
import { consumePendingRegistration } from "@/infrastructure/auth/registration-otp";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const otp = typeof body?.otp === "string" ? body.otp.trim() : "";
  if (!email || !/^\d{6}$/.test(otp)) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Ingresá un código de seis dígitos." }, { status: 400 });

  const pending = await consumePendingRegistration(email, otp);
  if (!pending) return NextResponse.json({ code: "INVALID_OTP", message: "El código es inválido, venció o superó los intentos permitidos." }, { status: 400 });

  try {
    await mongo();
    await Usuarios.create({ email: pending.email, userName: pending.userName, password: pending.passwordHash, emailVerifiedAt: new Date() });
    return NextResponse.json({ message: "Cuenta creada correctamente." }, { status: 201 });
  } catch (error) {
    console.error("OTP registration finalization failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "REGISTRATION_ERROR", message: "No se pudo crear la cuenta." }, { status: 500 });
  }
}
