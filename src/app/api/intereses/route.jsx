import { NextResponse } from "next/server";
import DAOIntereses from "@/DAO/InteresesDAO";

export async function POST(req) {
  try {
    const { rePosteos, user } = await req.json();

    if (!rePosteos || !user) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    const result = await DAOIntereses.addRePosteos(rePosteos, user);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    console.error(error);
    const status = error.message === "Ya reposteaste este posteo" ? 400 : 500;
    return NextResponse.json(
      { error: error.message || 'Error desconocido' },
      { status: status }
    );
  }
}


export async function GET() {
  try {
    const result = await DAOIntereses.getAll();
    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}