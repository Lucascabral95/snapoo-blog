import { NextResponse } from "next/server";
import daoPosteos from "@/DAO/PosteosDAO";

export async function GET(req: Request) {
  try {
    const username = new URL(req.url).searchParams.get("username");

    if (!username) {
      return NextResponse.json({ error: "Falta el username" }, { status: 400 });
    }

    const misPosteos = await daoPosteos.getAllPosteosByUserNameId(username);

    return NextResponse.json({ result: misPosteos }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
