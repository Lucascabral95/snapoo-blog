import { NextResponse } from "next/server";
import DatosPersonalesDAO from "@/DAO/DatosPersonalesDAO";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import mongoose from "mongoose";

function unauthorized() {
  return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
}

function forbidden() {
  return NextResponse.json({ code: "FORBIDDEN", message: "No tenés permiso para este perfil." }, { status: 403 });
}

export async function GET(req: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user) return unauthorized();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el id." }, { status: 400 });
  if (id !== user.id) return forbidden();

  try {
    const result = await DatosPersonalesDAO.getDatosPersonalesByID(id);
    return result
      ? NextResponse.json({ result })
      : NextResponse.json({ code: "NOT_FOUND", message: "Datos personales no encontrados." }, { status: 404 });
  } catch (error) {
    console.error("Personal data lookup failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "PROFILE_LOOKUP_ERROR", message: "No se pudieron obtener los datos." }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user) return unauthorized();
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Falta el id." }, { status: 400 });
  if (id !== user.id) return forbidden();

  try {
    const result = await DatosPersonalesDAO.deleteDatosPersonalesByID(id);
    return result
      ? NextResponse.json({ result: "Datos personales eliminados" })
      : NextResponse.json({ code: "NOT_FOUND", message: "Datos personales no encontrados." }, { status: 404 });
  } catch (error) {
    console.error("Personal data deletion failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "PROFILE_DELETE_ERROR", message: "No se pudieron eliminar los datos." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user) return unauthorized();

  try {
    const body = await req.json();
    const required = ["nombre", "apellido", "provincia", "pais", "bio"];
    if (required.some((key) => typeof body[key] !== "string" || !body[key].trim()) || !Number.isInteger(Number(body.edad))) {
      return NextResponse.json({ code: "VALIDATION_ERROR", message: "Los datos enviados no son válidos." }, { status: 400 });
    }

    const existing = await DatosPersonalesDAO.getDatosPersonalesByID(user.id);
    if (existing) return NextResponse.json({ code: "ALREADY_EXISTS", message: "El perfil ya tiene datos personales." }, { status: 409 });

    const result = await DatosPersonalesDAO.createDatosPersonales({
      nombre: body.nombre.trim().slice(0, 80),
      apellido: body.apellido.trim().slice(0, 80),
      provincia: body.provincia.trim().slice(0, 80),
      pais: body.pais.trim().slice(0, 80),
      bio: body.bio.trim().slice(0, 1000),
      edad: Number(body.edad),
      user: user.id as unknown as mongoose.Schema.Types.ObjectId,
    });
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error("Personal data creation failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "PROFILE_CREATE_ERROR", message: "No se pudieron guardar los datos." }, { status: 500 });
  }
}
