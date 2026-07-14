import { NextResponse } from "next/server";
import mongoose from "mongoose";
import UserSession from "@/models/UserSession";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { const user = await getActiveAuthenticatedUser(); if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 }); const { id } = await params; if (!mongoose.isValidObjectId(id)) return NextResponse.json({ code: "VALIDATION_ERROR" }, { status: 400 }); await mongo(); const session = await UserSession.findOne({ _id: id, user: user.id, revokedAt: { $exists: false } }).lean() as any; if (!session) return NextResponse.json({ code: "NOT_FOUND" }, { status: 404 }); if (session.sessionId === user.sessionId) return NextResponse.json({ code: "CURRENT_SESSION", message: "No podés revocar la sesión actual desde esta acción." }, { status: 400 }); await UserSession.updateOne({ _id: id }, { $set: { revokedAt: new Date() } }); return NextResponse.json({ message: "Sesión revocada." }); }

