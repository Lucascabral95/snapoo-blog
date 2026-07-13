import { NextResponse } from "next/server";
import mongoose from "mongoose";
import daoIntereses from "@/DAO/InteresesDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";

export async function POST(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });
  const body = await req.json().catch(() => null);
  const repostId = body?.rePosteos;
  if (typeof repostId !== "string" || !mongoose.isValidObjectId(repostId)) {
    return NextResponse.json({ code: "VALIDATION_ERROR", message: "El posteo no es válido." }, { status: 400 });
  }

  try {
    const result = await daoIntereses.addRePosteos(repostId, user.id);
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    if (message === "Ya reposteaste este posteo") return NextResponse.json({ code: "ALREADY_REPOSTED", message }, { status: 409 });
    console.error("Repost failed", message || "unknown error");
    return NextResponse.json({ code: "REPOST_ERROR", message: "No se pudo guardar el repost." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await daoIntereses.getAll();
    return NextResponse.json({ result });
  } catch (error) {
    console.error("Repost lookup failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "REPOST_LOOKUP_ERROR", message: "No se pudieron obtener los reposts." }, { status: 500 });
  }
}
