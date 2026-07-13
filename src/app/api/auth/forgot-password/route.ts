import { NextResponse } from "next/server";
import DAOUsuarios from "@/DAO/UsuarioDAO";
import { createAuthToken } from "@/infrastructure/auth/tokens";
import { sendPasswordResetEmail } from "@/infrastructure/auth/email";
import { checkRateLimit, requestIdentifier } from "@/infrastructure/auth/rate-limit";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!email || !(await checkRateLimit("recovery", `${requestIdentifier(request)}:${email}`))) return NextResponse.json({ message: "Si existe una cuenta, recibirás instrucciones por email." }, { status: 202 });
  try {
    const user = await DAOUsuarios.getUserByEmail(email);
    if (user) {
      const token = await createAuthToken(String(user._id), "password-reset", 30 * 60 * 1000);
      await sendPasswordResetEmail(email, token);
    }
  } catch (error) {
    console.error("Password recovery failed", error instanceof Error ? error.message : "unknown error");
  }
  return NextResponse.json({ message: "Si existe una cuenta, recibirás instrucciones por email." }, { status: 202 });
}
