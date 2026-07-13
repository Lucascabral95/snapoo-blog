import { NextResponse } from "next/server";
import DAOComentarios from "@/DAO/ComentariosDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.posteo || typeof body.contenido !== "string" || !body.contenido.trim()) {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "El comentario es obligatorio." }, { status: 400 });
  }

  try {
    const result = await DAOComentarios.createComentario({
      emisor: user.userName || user.email || "Usuario",
      posteo: String(body.posteo),
      usuario: user.id,
      contenido: body.contenido.trim().slice(0, 1000),
      likes: 0,
    });
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error("Comment creation failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "COMMENT_CREATE_ERROR", message: "No se pudo crear el comentario." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el id." }, { status: 400 });

  try {
    const comment = await DAOComentarios.getComentarioByID(id);
    if (!comment) return NextResponse.json({ code: "NOT_FOUND", message: "Comentario no encontrado." }, { status: 404 });
    if (String(comment.usuario) !== user.id) return NextResponse.json({ code: "FORBIDDEN", message: "No tenés permiso para eliminarlo." }, { status: 403 });
    await DAOComentarios.deleteComentarioByID(id);
    return NextResponse.json({ result: "Comentario eliminado" });
  } catch (error) {
    console.error("Comment deletion failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "COMMENT_DELETE_ERROR", message: "No se pudo eliminar el comentario." }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const post = new URL(req.url).searchParams.get("post");
  if (!post) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el posteo." }, { status: 400 });
  try {
    const result = await DAOComentarios.getComentarios(post);
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Comment lookup failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "COMMENT_LOOKUP_ERROR", message: "No se pudieron obtener los comentarios." }, { status: 500 });
  }
}
