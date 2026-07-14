import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeAuthToken, revokeAuthTokens } from "@/infrastructure/auth/tokens";
import DAOUsuarios from "@/DAO/UsuarioDAO";
import { revokeSessions } from "@/infrastructure/account/security";
import { checkRateLimit, requestIdentifier } from "@/infrastructure/auth/rate-limit";
const schema = z.object({ token: z.string().length(64), password: z.string().min(12).max(128) });
export async function POST(request: Request) { const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Los datos enviados no son válidos." }, { status: 400 }); if (!(await checkRateLimit("recovery", requestIdentifier(request)))) return NextResponse.json({ code: "RATE_LIMITED", message: "Probá nuevamente más tarde." }, { status: 429 }); const token = await consumeAuthToken(parsed.data.token, "password-reset"); if (!token) return NextResponse.json({ code: "INVALID_TOKEN", message: "El token expiró o ya fue utilizado." }, { status: 400 }); const userId = String(token.user); await DAOUsuarios.updatePassword(userId, parsed.data.password); await revokeAuthTokens(userId, "password-reset"); await revokeSessions(userId); return NextResponse.json({ message: "Contraseña actualizada correctamente. Iniciá sesión nuevamente." }); }
