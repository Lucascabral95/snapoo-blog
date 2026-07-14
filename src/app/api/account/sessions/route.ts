import { NextResponse } from "next/server";
import UserSession from "@/models/UserSession";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { recordSessionActivity, revokeSessions } from "@/infrastructure/account/security";
import mongo from "@/services/mongoDB";

export async function GET(request: Request) {
  const user = await getActiveAuthenticatedUser();
  if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  await recordSessionActivity(user.id, user.sessionId, request.headers);
  await mongo();
  const result = await UserSession.find({ user: user.id, revokedAt: { $exists: false }, expiresAt: { $gt: new Date() } }).select("sessionId device createdAt lastActiveAt expiresAt").sort({ lastActiveAt: -1 }).lean();
  return NextResponse.json({ result: result.map((session: any) => ({ id: String(session._id), device: session.device, createdAt: session.createdAt, lastActiveAt: session.lastActiveAt, expiresAt: session.expiresAt, current: session.sessionId === user.sessionId })) });
}

export async function DELETE() {
  const user = await getActiveAuthenticatedUser();
  if (!user?.sessionId) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  await revokeSessions(user.id, user.sessionId);
  return NextResponse.json({ message: "Se cerraron las demás sesiones." });
}

