import { NextResponse } from "next/server";
import daoPosteos from "@/DAO/PosteosDAO";

export async function GET(req: Request) {
     try {
          const result = await daoPosteos.getAll();
          return NextResponse.json({ result: result }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: error }, { status: 500 });
     }
}

