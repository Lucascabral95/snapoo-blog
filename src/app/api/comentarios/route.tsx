import { NextResponse } from "next/server";
import DAOComentarios from "@/DAO/ComentariosDAO";

export async function POST(req: Request) {
  const { emisor, posteo, usuario } = await req.json();

  if (!emisor || !posteo || !usuario) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  try {
    const eliminar = await DAOComentarios.deleteComentarioByID(id);

    if (!eliminar) {
      return NextResponse.json(
        { result: "Comentario no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: "Comentario eliminado" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  const post = new URL(req.url).searchParams.get("post");

  if (!post) {
    return NextResponse.json({ error: "Falta el posteo" }, { status: 400 });
  }

  try {
    const comentarios = await DAOComentarios.getComentarios(post);

    if (!comentarios) {
      return NextResponse.json(
        { result: "Comentarios no encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: "Comentarios encontrados" },
      { status: 200 }
    );
    
  } catch (error) {
    return NextResponse.json(
      { error: error },
      { status: 500 }
    );
  }
}
