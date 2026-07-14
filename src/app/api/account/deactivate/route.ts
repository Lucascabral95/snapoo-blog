import { NextResponse } from "next/server";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { hasValidReauthentication, revokeSessions } from "@/infrastructure/account/security";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
export async function POST(request: Request) { const user = await getActiveAuthenticatedUser(); if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); if (!(await hasValidReauthentication(user.id, user.sessionId, request.headers.get("x-reauthentication-token")))) return NextResponse.json({ code: "REAUTHENTICATION_REQUIRED" }, { status: 403 }); await mongo(); await Usuarios.updateOne({ _id: user.id }, { $set: { accountStatus: "deactivated", deactivatedAt: new Date(), scheduledPurgeAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) } }); await revokeSessions(user.id); return NextResponse.json({ message: "Tu cuenta se desactivó y podrá reactivarse durante 30 días." }); }
