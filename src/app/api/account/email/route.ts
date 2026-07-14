import { NextResponse } from "next/server";
import { z } from "zod";
import Usuarios from "@/models/Usuario";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { hasValidReauthentication } from "@/infrastructure/account/security";
import { createAuthToken } from "@/infrastructure/auth/tokens";
import { sendEmailChangeVerification } from "@/infrastructure/auth/email";
import { checkRateLimit } from "@/infrastructure/auth/rate-limit";
import mongo from "@/services/mongoDB";
const schema = z.object({ email: z.string().trim().toLowerCase().email().max(254) });
export async function POST(request: Request) {
  const user = await getActiveAuthenticatedUser(); if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  if (!(await checkRateLimit("account", user.id))) return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 });
  if (!(await hasValidReauthentication(user.id, user.sessionId, request.headers.get("x-reauthentication-token")))) return NextResponse.json({ code: "REAUTHENTICATION_REQUIRED" }, { status: 403 });
  if (parsed.data.email === user.email) return NextResponse.json({ code: "SAME_EMAIL", message: "Ese ya es tu email actual." }, { status: 400 });
  await mongo(); if (await Usuarios.exists({ email: parsed.data.email })) return NextResponse.json({ code: "EMAIL_IN_USE", message: "No se pudo iniciar el cambio de email." }, { status: 409 });
  const token = await createAuthToken(user.id, "email-change", 30 * 60 * 1000, parsed.data.email); await sendEmailChangeVerification(parsed.data.email, token);
  return NextResponse.json({ message: "Enviamos una confirmación al nuevo email." }, { status: 202 });
}
