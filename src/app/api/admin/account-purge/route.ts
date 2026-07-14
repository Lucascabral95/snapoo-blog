import { NextResponse } from "next/server";
import { getStaffUser } from "@/infrastructure/auth/session";
import Usuarios from "@/models/Usuario";
import DatosPersonales from "@/models/DatosPersonales";
import Posteos from "@/models/Posteos";
import Comentarios from "@/models/Comentarios";
import PostLike from "@/models/PostLike";
import UserFollow from "@/models/UserFollow";
import UserBlock from "@/models/UserBlock";
import UserSession from "@/models/UserSession";
import mongo from "@/services/mongoDB";

function isValidJobToken(request: Request): boolean {
  const configured = process.env.ACCOUNT_PURGE_JOB_TOKEN;
  return Boolean(configured && request.headers.get("authorization") === `Bearer ${configured}`);
}

async function purgeCloudinaryAssets(posts: Array<{ cloudinaryPublicId?: string; cloudinaryDeliveryType?: "upload" | "authenticated" }>): Promise<void> {
  const assets = posts.filter((post) => post.cloudinaryPublicId);
  if (!assets.length) return;
  const { v2: cloudinary } = await import("cloudinary");
  cloudinary.config({ cloud_name: process.env.CLOUD_NAME_CLOUDINARY, api_key: process.env.API_KEY_CLOUDINARY, api_secret: process.env.API_SECRET_CLOUDINARY });
  await Promise.all(assets.map(async (post) => {
    const result = await cloudinary.uploader.destroy(post.cloudinaryPublicId!, { resource_type: "image", type: post.cloudinaryDeliveryType || "upload", invalidate: true });
    if (result.result !== "ok" && result.result !== "not found") throw new Error(`Cloudinary could not purge ${post.cloudinaryPublicId}`);
  }));
}

export async function POST(request: Request) {
  const staff = await getStaffUser();
  if ((!staff || staff.role !== "admin") && !isValidJobToken(request)) return NextResponse.json({ code: "FORBIDDEN" }, { status: 403 });
  await mongo();
  const users = await Usuarios.find({ accountStatus: "deactivated", scheduledPurgeAt: { $lte: new Date() } }).select("_id").lean();
  const ids = users.map((user: any) => user._id);
  if (!ids.length) return NextResponse.json({ purged: 0 });
  const posts = await Posteos.find({ usuario: { $in: ids } }).select("cloudinaryPublicId cloudinaryDeliveryType").lean() as Array<{ cloudinaryPublicId?: string; cloudinaryDeliveryType?: "upload" | "authenticated" }>;
  try { await purgeCloudinaryAssets(posts); } catch (error) { console.error("Account asset purge failed", error instanceof Error ? error.message : "unknown error"); return NextResponse.json({ code: "ASSET_PURGE_ERROR" }, { status: 502 }); }
  await Promise.all([
    DatosPersonales.deleteMany({ user: { $in: ids } }),
    Posteos.deleteMany({ usuario: { $in: ids } }),
    Comentarios.deleteMany({ usuario: { $in: ids } }),
    PostLike.deleteMany({ user: { $in: ids } }),
    UserFollow.deleteMany({ $or: [{ follower: { $in: ids } }, { followed: { $in: ids } }] }),
    UserBlock.deleteMany({ $or: [{ blocker: { $in: ids } }, { blocked: { $in: ids } }] }),
    UserSession.deleteMany({ user: { $in: ids } }),
    Usuarios.deleteMany({ _id: { $in: ids } }),
  ]);
  return NextResponse.json({ purged: ids.length });
}
