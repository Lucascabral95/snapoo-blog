import { NextResponse } from "next/server";
import daoIntereses from "../../../DAO/InteresesDAO";

export async function POST(req: Request) {
  try {
    const { rePosteos, user } = await req.json();

    if (!rePosteos || !user) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }
    const result = await daoIntereses.addRePosteos(rePosteos, user);

    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error: any) {
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
    const result = await daoIntereses.getAll();
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error || 'Internal Server Error' }, { status: 500 });
  }
}