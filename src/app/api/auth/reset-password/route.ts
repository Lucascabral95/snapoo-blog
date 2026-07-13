import { NextResponse } from "next/server";
import { z } from "zod";
import { consumeAuthToken } from "@/infrastructure/auth/tokens";
import DAOUsuarios from "@/DAO/UsuarioDAO";

const schema = z.object({ token: z.string().length(64), password: z.string().min(12).max(128) });

export async function POST(request: Request) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Los datos enviados no son válidos." }, { status: 400 });
  const token = await consumeAuthToken(parsed.data.token, "password-reset");
  if (!token) return NextResponse.json({ code: "INVALID_TOKEN", message: "El token expiró o ya fue utilizado." }, { status: 400 });
  await DAOUsuarios.updatePassword(String(token.user), parsed.data.password);
  return NextResponse.json({ message: "Contraseña actualizada correctamente." });
}
