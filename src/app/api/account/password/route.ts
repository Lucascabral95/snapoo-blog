import { NextResponse } from "next/server";
import { z } from "zod";
import UsuarioDAO from "@/DAO/UsuarioDAO";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { hasValidReauthentication, revokeSessions } from "@/infrastructure/account/security";
import { revokeAuthTokens } from "@/infrastructure/auth/tokens";
import { checkRateLimit } from "@/infrastructure/auth/rate-limit";
const schema = z.object({ currentPassword: z.string().min(1).max(128), password: z.string().min(12).max(128) });
export async function POST(request: Request) {
  const user = await getActiveAuthenticatedUser(); if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  if (!(await checkRateLimit("account", user.id))) return NextResponse.json({ code: "RATE_LIMITED" }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La nueva contraseña debe tener al menos 12 caracteres." }, { status: 400 });
  const account = await UsuarioDAO.getUserByID(user.id); if (!account?.password) return NextResponse.json({ code: "GOOGLE_REAUTH_REQUIRED" }, { status: 409 });
  const valid = await hasValidReauthentication(user.id, user.sessionId, request.headers.get("x-reauthentication-token"));
  const bcrypt = await import("bcrypt");
  if (!valid || !(await bcrypt.default.compare(parsed.data.currentPassword, account.password))) return NextResponse.json({ code: "REAUTHENTICATION_REQUIRED", message: "Confirmá tu contraseña nuevamente." }, { status: 403 });
  await UsuarioDAO.updatePassword(user.id, parsed.data.password); await revokeAuthTokens(user.id, "password-reset"); await revokeSessions(user.id, user.sessionId);
  return NextResponse.json({ message: "Contraseña actualizada. Se cerraron las demás sesiones." });
}



