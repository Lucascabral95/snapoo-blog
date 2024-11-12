import { NextResponse } from "next/server";
import DAOPosteos from "@/DAO/PosteosDAO";

export async function GET(req) {
    try {
         const resultados = await DAOPosteos.getAll();
         return NextResponse.json({ result: resultados }, { status: 200 });
    } catch (error) {
         return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}