import { NextResponse } from "next/server";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import Usuarios from "@/models/Usuario";
import mongo from "@/services/mongoDB";
export async function POST() { const user = await getAuthenticatedUser(); if (!user || user.accountStatus !== "deactivated") return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 }); await mongo(); const updated = await Usuarios.findOneAndUpdate({ _id: user.id, accountStatus: "deactivated", scheduledPurgeAt: { $gt: new Date() } }, { $set: { accountStatus: "active" }, $unset: { deactivatedAt: 1, scheduledPurgeAt: 1 } }, { new: true }); if (!updated) return NextResponse.json({ code: "REACTIVATION_EXPIRED", message: "El período de reactivación venció." }, { status: 410 }); return NextResponse.json({ message: "Tu cuenta fue reactivada." }); }
