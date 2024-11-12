import { NextResponse } from "next/server";
import DAOUsuarios from "@/DAO/UsuarioDAO";

export async function POST(req: Request) {
  try {
    const { email, password, avatar } = await req.json();

    const userName = `User-${Math.random().toString(36).substring(2, 8)}`;

    if (!email) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const emailRepetido = await DAOUsuarios.getUserByEmail(email); 
    if (emailRepetido) {
      return NextResponse.json({ error: "Email ya registrado" }, { status: 400 });
    }

    const user = await DAOUsuarios.createUser({ email, password, avatar, userName });
    return NextResponse.json({ result: user }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}


export async function GET(req: Request) {
  try {
    const resultados = await DAOUsuarios.getAll();
    
    return NextResponse.json({ result: resultados }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}