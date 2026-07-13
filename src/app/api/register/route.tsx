import { NextResponse } from "next/server";
import DAOUsuarios from "@/DAO/UsuarioDAO";

export async function POST() {
  return NextResponse.json({ code: "DEPRECATED", message: "Usá /api/auth/register/start para iniciar el registro seguro." }, { status: 410 });
}

export async function GET(req: Request) {
  const username = new URL(req.url).searchParams.get("username")?.trim();
  if (!username) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el username." }, { status: 400 });
  const user = await DAOUsuarios.getUserByUserName(username);
  return user ? NextResponse.json({ result: { id: String(user._id), userName: user.userName, avatar: user.avatar || "" } }) : NextResponse.json({ code: "NOT_FOUND", message: "Usuario no encontrado." }, { status: 404 });
}
