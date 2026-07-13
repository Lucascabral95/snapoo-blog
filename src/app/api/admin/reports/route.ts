import { NextResponse } from "next/server";
import ModerationReport from "@/models/ModerationReport";
import { getStaffUser } from "@/infrastructure/auth/session";
import mongo from "@/services/mongoDB";

export async function GET(request: Request) {
  const staff = await getStaffUser();
  if (!staff) return NextResponse.json({ code: "FORBIDDEN", message: "Acceso restringido." }, { status: 403 });
  await mongo();
  const params = new URL(request.url).searchParams;
  const status = params.get("status") || "open";
  const result = await ModerationReport.find({ status }).sort({ priority: -1, createdAt: 1 }).limit(50).populate("reporter targetAuthor assignedTo", "userName email avatar").lean();
  return NextResponse.json({ result });
}
