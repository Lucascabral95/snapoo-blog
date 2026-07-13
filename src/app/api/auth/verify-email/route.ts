import { NextResponse } from "next/server";
import { consumeAuthToken } from "@/infrastructure/auth/tokens";
import DAOUsuarios from "@/DAO/UsuarioDAO";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (typeof body?.token !== "string" || body.token.length !== 64) return NextResponse.json({ code: "INVALID_TOKEN", message: "El token no es válido." }, { status: 400 });
  const token = await consumeAuthToken(body.token, "email-verification");
  if (!token) return NextResponse.json({ code: "INVALID_TOKEN", message: "El token expiró o ya fue utilizado." }, { status: 400 });
  await DAOUsuarios.markEmailVerified(String(token.user));
  return NextResponse.json({ message: "Email verificado correctamente." });
}
