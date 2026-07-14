import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { z } from "zod";
import UsuarioDAO from "@/DAO/UsuarioDAO";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { createReauthenticationChallenge } from "@/infrastructure/account/security";
import { checkRateLimit } from "@/infrastructure/auth/rate-limit";

const schema = z.object({ password: z.string().min(1).max(128) });
export async function POST(request: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión activa requerida." }, { status: 401 });
  if (!(await checkRateLimit("reauthentication", user.id))) return NextResponse.json({ code: "RATE_LIMITED", message: "Probá nuevamente más tarde." }, { status: 429 });
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Contraseña inválida." }, { status: 400 });
  const account = await UsuarioDAO.getUserByID(user.id);
  if (!account?.password) return NextResponse.json({ code: "GOOGLE_REAUTH_REQUIRED", message: "Volvé a autenticarte con Google para continuar." }, { status: 409 });
  if (!(await bcrypt.compare(parsed.data.password, account.password))) return NextResponse.json({ code: "INVALID_CREDENTIALS", message: "La contraseña es incorrecta." }, { status: 400 });
  return NextResponse.json({ token: await createReauthenticationChallenge(user.id, user.sessionId), expiresIn: 600 });
}
