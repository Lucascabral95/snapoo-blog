import { NextResponse } from "next/server";
import daoPosteos from "@/DAO/PosteosDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";

export async function GET() {
  try {
    const viewer = await getAuthenticatedUser();
    const result = await daoPosteos.getAllWithoutPopulate(viewer?.id);
    
    return NextResponse.json({ result: result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
