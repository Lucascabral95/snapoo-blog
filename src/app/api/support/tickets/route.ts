import { NextResponse } from "next/server";
import { z } from "zod";
import SupportTicket, { SUPPORT_CATEGORIES, SUPPORT_PRIORITIES } from "@/models/SupportTicket";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
import { checkRateLimit } from "@/infrastructure/auth/rate-limit";
const schema = z.object({ category: z.enum(SUPPORT_CATEGORIES), priority: z.enum(SUPPORT_PRIORITIES).default("normal"), subject: z.string().trim().min(3).max(140), message: z.string().trim().min(10).max(4000) });
export async function GET() { const user = await getAuthenticatedUser(); if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); await mongo(); const result = await SupportTicket.find({ user: user.id }).sort({ createdAt: -1 }).lean(); return NextResponse.json({ result }); }
export async function POST(request: Request) { const user = await getAuthenticatedUser(); if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); if (!(await checkRateLimit("support", user.id))) return NextResponse.json({ code: "RATE_LIMITED", message: "Probá nuevamente más tarde." }, { status: 429 }); const parsed = schema.safeParse(await request.json().catch(() => null)); if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Revisá la categoría, asunto y mensaje." }, { status: 400 }); await mongo(); const ticket = await SupportTicket.create({ user: user.id, ...parsed.data }); return NextResponse.json({ result: ticket }, { status: 201 }); }
