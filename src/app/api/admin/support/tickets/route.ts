import { NextResponse } from "next/server";
import SupportTicket, { SUPPORT_STATUSES } from "@/models/SupportTicket";
import { getStaffUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
export async function GET(request: Request) { const staff = await getStaffUser(); if (!staff) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 }); const status = new URL(request.url).searchParams.get("status"); if (status && !SUPPORT_STATUSES.includes(status as typeof SUPPORT_STATUSES[number])) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 }); await mongo(); const result = await SupportTicket.find(status ? { status } : {}).sort({ priority: -1, createdAt: 1 }).limit(100).populate("user assignedTo", "userName email avatar").lean(); return NextResponse.json({ result }); }
