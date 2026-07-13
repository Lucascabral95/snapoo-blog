import { NextResponse } from "next/server";
import UserNotification from "@/models/UserNotification";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function GET(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  await mongo();
  const page = Math.max(1, Number(new URL(req.url).searchParams.get("page") || 1));
  const limit = Math.min(50, Math.max(1, Number(new URL(req.url).searchParams.get("limit") || 20)));
  const [notifications, unread] = await Promise.all([
    UserNotification.find({ recipient: user.id }).populate("actors", "userName avatar").populate("actor", "userName avatar").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).lean(),
    UserNotification.countDocuments({ recipient: user.id, readAt: { $exists: false } }),
  ]);
  return NextResponse.json({ result: notifications, unread });
}

export async function PATCH(req: Request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED" }, { status: 401 });
  await mongo();
  const body = await req.json().catch(() => ({}));
  const filter: any = { recipient: user.id, readAt: { $exists: false } };
  if (body.notificationId) filter._id = body.notificationId;
  await UserNotification.updateMany(filter, { $set: { readAt: new Date() } });
  return NextResponse.json({ result: true });
}

