import { NextResponse } from "next/server";
import DAOComentarios from "@/DAO/ComentariosDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import Posteos from "@/models/Posteos";
import Comentarios from "@/models/Comentarios";
import mongo from "@/services/mongoDB";
import { createSocialNotification, usersAreBlocked } from "@/infrastructure/social/notifications";

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
  const body = await req.json().catch(() => null);
  if (!body?.posteo || typeof body.contenido !== "string" || !body.contenido.trim()) return NextResponse.json({ code: "VALIDATION_ERROR", message: "El comentario es obligatorio." }, { status: 400 });
  try {
    await mongo();
    const post = await Posteos.findOne({ _id: body.posteo, moderationState: { $ne: "removed" } }).lean();
    if (!post) return NextResponse.json({ code: "NOT_FOUND", message: "Posteo no encontrado." }, { status: 404 });
    let parentComment: any = null;
    if (body.parentComment) {
      parentComment = await Comentarios.findOne({ _id: body.parentComment, posteo: body.posteo, moderationState: { $ne: "removed" } }).lean();
      if (!parentComment || parentComment.parentComment) return NextResponse.json({ code: "VALIDATION_ERROR", message: "La respuesta no es válida." }, { status: 400 });
    }
    const recipient = String(parentComment?.usuario ?? (post as any).usuario);
    if (await usersAreBlocked(user.id, recipient)) return NextResponse.json({ code: "FORBIDDEN", message: "No podés interactuar con este usuario." }, { status: 403 });
    const result = await DAOComentarios.createComentario({ emisor: user.userName || user.email || "Usuario", posteo: String(body.posteo), usuario: user.id, contenido: body.contenido.trim().slice(0, 1000), likes: 0, parentComment: parentComment?._id });
    await createSocialNotification({ recipient, actor: user.id, type: parentComment ? "comment_reply" : "post_comment", resourceType: parentComment ? "comment" : "post", resourceId: String(result._id), href: `/posteo/${body.posteo}#comment-${String(result._id)}` });
    return NextResponse.json({ result }, { status: 201 });
  } catch { return NextResponse.json({ code: "COMMENT_CREATE_ERROR", message: "No se pudo crear el comentario." }, { status: 500 }); }
}

export async function GET(req: Request) {
  const post = new URL(req.url).searchParams.get("post");
  if (!post) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el posteo." }, { status: 400 });
  try { return NextResponse.json({ result: await DAOComentarios.getComentarios(post) }); } catch { return NextResponse.json({ code: "COMMENT_LOOKUP_ERROR", message: "No se pudieron obtener los comentarios." }, { status: 500 }); }
}


