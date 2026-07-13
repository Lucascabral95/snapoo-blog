import { NextResponse } from "next/server";
import UserNotification from "@/models/UserNotification";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function GET() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n requerida." }, { status: 401 });
  await mongo();
  const result = await UserNotification.find({ recipient: user.id }).sort({ createdAt: -1 }).limit(50).lean();
  return NextResponse.json({ result });
}

export async function PATCH() {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n requerida." }, { status: 401 });
  await mongo();
  await UserNotification.updateMany({ recipient: user.id, readAt: { $exists: false } }, { $set: { readAt: new Date() } });
  return NextResponse.json({ message: "Notificaciones actualizadas." });
}
