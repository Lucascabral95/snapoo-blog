import { NextResponse } from "next/server";
import DAOPosteos from "@/DAO/PosteosDAO";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      const existePosteo = await DAOPosteos.getPosteoByID(id);

      if (existePosteo) {
        return NextResponse.json({ result: existePosteo }, { status: 200 });
      } else {
        return NextResponse.json(
          { result: "No hay posteo", message: "EL posteo no existe" },
          { status: 204 }
        );
      }
    }

    const posteos = await DAOPosteos.getAll();

    if (!posteos) {
      return NextResponse.json(
        { result: [], message: "No posts available" },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: posteos }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const { likes, usuario, comentarios, imagen, descripcion } = await req.json();

  if (!usuario || !imagen) {
    return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
  }

  try {
    const posteo = await DAOPosteos.createPost({
      likes: likes,
      usuario: usuario,
      comentarios: comentarios,
      imagen: imagen,
      descripcion: descripcion,
    });
    return NextResponse.json({ result: posteo }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  try {
    const eliminar = await DAOPosteos.deletePosteoByID(id);

    if (!eliminar) {
      return NextResponse.json(
        { result: "Posteo no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: "Posteo eliminado" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const id = new URL(req.url).searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const cantidadDeLikes = await DAOPosteos.likePosteo(id);

    return NextResponse.json(
      { result: cantidadDeLikes },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
