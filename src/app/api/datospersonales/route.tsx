import { NextResponse } from "next/server";
import DatosPersonalesDAO from "@/DAO/DatosPersonalesDAO";

export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Falta el id" }, { status: 400 });
  }

  try {
    const datosPersonales = await DatosPersonalesDAO.getDatosPersonalesByID(id);

    if (!datosPersonales) {
      return NextResponse.json(
        { result: "Datos personales no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({ result: datosPersonales }, { status: 200 });
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
    const datosPersonales = await DatosPersonalesDAO.deleteDatosPersonalesByID(
      id
    );

    if (!datosPersonales) {
      return NextResponse.json(
        { result: "Datos personales no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { result: "Datos personales eliminados" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nombre, apellido, provincia, pais, edad, bio, user } =
      await req.json();

    if (!nombre || !apellido || !provincia || !pais || !edad || !bio || !user) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const existeUsuario = await DatosPersonalesDAO.getDatosPersonalesByID(user);
    if (existeUsuario) {
      return NextResponse.json(
        { error: "Este usuario ya tiene sus datos personales creados" },
        { status: 400 }
      );
    }

    const existenDatos = await DatosPersonalesDAO.getDatosPersonalesByID(user);
    if (existenDatos) {
      return NextResponse.json(
        { error: "Este usuario ya tiene sus datos personales creados" },
        { status: 400 }
      );
    }

    const datosPersonales = await DatosPersonalesDAO.createDatosPersonales({
      provincia,
      pais,
      edad: Number(edad),
      bio,
      nombre,
      apellido,
      user,
    });

    return NextResponse.json({ result: datosPersonales }, { status: 201 });
  } catch (error) {
    console.error("Error al crear datos personales:", error);
    return NextResponse.json(
      { error: "Hubo un error al procesar la solicitud" },
      { status: 500 }
    );
  }
}
