import { NextResponse } from "next/server";
import DAOUsuarios from "@/DAO/UsuarioDAO";
import UserFollow from "@/models/UserFollow";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function POST() { return NextResponse.json({ code: "DEPRECATED", message: "Usá /api/auth/register/start para iniciar el registro seguro." }, { status: 410 }); }

export async function GET(request: Request) {
  const username = new URL(request.url).searchParams.get("username")?.trim();
  if (!username) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el username." }, { status: 400 });
  const user = await DAOUsuarios.getActiveUserByUserName(username);
  if (!user) return NextResponse.json({ code: "NOT_FOUND", message: "Usuario no encontrado." }, { status: 404 });
  if (user.isPrivate) {
    const viewer = await getAuthenticatedUser();
    const isOwner = viewer?.id === String(user._id);
    await mongo();
    const follows = viewer && await UserFollow.exists({ follower: viewer.id, followed: user._id });
    if (!isOwner && !follows) return NextResponse.json({ code: "NOT_FOUND", message: "Usuario no encontrado." }, { status: 404 });
  }
  return NextResponse.json({ result: { id: String(user._id), userName: user.userName, avatar: user.avatar || "" } });
}
