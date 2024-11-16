import { NextResponse } from "next/server";
import daoPosteos from "@/DAO/PosteosDAO";

export async function GET() {
     try {
          const result = await daoPosteos.getAllWithoutPopulate();
          return NextResponse.json({ result: result }, { status: 200 });
     } catch (error) {
          return NextResponse.json({ error: error }, { status: 500 });
     }
}

