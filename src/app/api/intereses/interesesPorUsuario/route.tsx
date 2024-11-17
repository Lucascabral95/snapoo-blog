import { NextResponse } from "next/server";
import daoIntereses from "@/DAO/InteresesDAO";

export async function GET(req: Request) {
    try {
        const username = new URL(req.url).searchParams.get("username");

        if (!username) {
            return NextResponse.json({ error: "Falta el username" }, { status: 400 });
        }

        const misIntereses = await daoIntereses.getInteresesByUserName(username);
        
        return NextResponse.json({ result: misIntereses }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}