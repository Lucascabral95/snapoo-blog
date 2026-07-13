import { NextResponse } from "next/server";
import Posteos from "@/models/Posteos";
import { getActiveAuthenticatedUser } from "@/infrastructure/auth/session";
import { getBlockedUserIds } from "@/infrastructure/moderation/visibility";
import mongo from "@/services/mongoDB";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const viewer = await getActiveAuthenticatedUser();
  if (!viewer) return NextResponse.json({ code: "UNAUTHORIZED", message: "SesiÃ³n activa requerida." }, { status: 401 });
  const { id } = await params;
  await mongo();
  const blocked = await getBlockedUserIds(viewer.id);
  const post = await Posteos.findOne({ _id: id, moderationState: { $ne: "removed" }, usuario: { $nin: blocked } }).select("imagen cloudinaryPublicId cloudinaryDeliveryType").lean() as { imagen?: string; cloudinaryPublicId?: string; cloudinaryDeliveryType?: string } | null;
  if (!post?.imagen) return NextResponse.json({ code: "NOT_FOUND", message: "Imagen no disponible." }, { status: 404 });
  if (post.cloudinaryPublicId && post.cloudinaryDeliveryType === "authenticated") {
    const { v2: cloudinary } = await import("cloudinary");
    cloudinary.config({ cloud_name: process.env.CLOUD_NAME_CLOUDINARY, api_key: process.env.API_KEY_CLOUDINARY, api_secret: process.env.API_SECRET_CLOUDINARY });
    const signedUrl = cloudinary.url(post.cloudinaryPublicId, { secure: true, type: "authenticated", sign_url: true });
    return NextResponse.redirect(signedUrl, { headers: { "Cache-Control": "private, no-store" } });
  }
  return NextResponse.redirect(post.imagen, { headers: { "Cache-Control": "private, no-store" } });
}
