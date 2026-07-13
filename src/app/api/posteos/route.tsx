import { NextResponse } from "next/server";
import DAOPosteos from "@/DAO/PosteosDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";

function unauthorized() {
  return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
}

export async function GET(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    const result = id ? await DAOPosteos.getPosteoByID(id) : await DAOPosteos.getAll();
    return NextResponse.json({ result: result || [] });
  } catch (error) {
    console.error("Post lookup failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "POST_LOOKUP_ERROR", message: "No se pudieron obtener los posteos." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();

  try {
    const body = await req.json();
    if (typeof body.imagen !== "string" || !body.imagen.trim()) {
      return NextResponse.json({ code: "VALIDATION_ERROR", message: "La imagen es obligatoria." }, { status: 400 });
    }

    const posteo = await DAOPosteos.createPost({
      usuario: user.id,
      imagen: body.imagen,
      descripcion: typeof body.descripcion === "string" ? body.descripcion.slice(0, 2000) : "",
      likes: 0,
      comentarios: [],
    });
    return NextResponse.json({ result: posteo }, { status: 201 });
  } catch (error) {
    console.error("Post creation failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "POST_CREATE_ERROR", message: "No se pudo crear el posteo." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el id." }, { status: 400 });

  try {
    const posteo = await DAOPosteos.getPosteoByID(id);
    if (!posteo) return NextResponse.json({ code: "NOT_FOUND", message: "Posteo no encontrado." }, { status: 404 });
    if (String(posteo.usuario?._id || posteo.usuario) !== user.id) {
      return NextResponse.json({ code: "FORBIDDEN", message: "No tenés permiso para eliminar este posteo." }, { status: 403 });
    }
    await DAOPosteos.deletePosteoByID(id);
    return NextResponse.json({ result: "Posteo eliminado" });
  } catch (error) {
    console.error("Post deletion failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "POST_DELETE_ERROR", message: "No se pudo eliminar el posteo." }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return unauthorized();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el id." }, { status: 400 });

  try {
    const result = await DAOPosteos.likePosteo(id);
    if (!result) return NextResponse.json({ code: "NOT_FOUND", message: "Posteo no encontrado." }, { status: 404 });
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Post like failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "POST_LIKE_ERROR", message: "No se pudo actualizar el like." }, { status: 500 });
  }
}
