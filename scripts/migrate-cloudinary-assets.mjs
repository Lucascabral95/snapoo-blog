import mongoose from "mongoose";
import { v2 as cloudinary } from "cloudinary";

const apply = process.argv.includes("--apply");
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) throw new Error("MONGODB_URI is required");

cloudinary.config({ cloud_name: process.env.CLOUD_NAME_CLOUDINARY, api_key: process.env.API_KEY_CLOUDINARY, api_secret: process.env.API_SECRET_CLOUDINARY });
await mongoose.connect(mongoUri);
const posts = mongoose.connection.collection("posteos");
const cursor = posts.find({ imagen: { $type: "string" }, cloudinaryPublicId: { $exists: false } });
let migrated = 0;
let skipped = 0;

for await (const post of cursor) {
  try {
    const parsed = new URL(post.imagen);
    const marker = "/image/upload/";
    const markerIndex = parsed.pathname.indexOf(marker);
    if (markerIndex < 0) { skipped += 1; continue; }
    const path = parsed.pathname.slice(markerIndex + marker.length);
    const parts = path.split("/");
    const withoutVersion = parts[0].startsWith("v") && parts[0].slice(1).split("").every((character) => character >= "0" && character <= "9") ? parts.slice(1).join("/") : path;
    const extensionIndex = withoutVersion.lastIndexOf(".");
    const publicId = extensionIndex > 0 ? withoutVersion.slice(0, extensionIndex) : withoutVersion;
    if (!publicId) { skipped += 1; continue; }
    if (apply) {
      await cloudinary.uploader.rename(publicId, publicId, { resource_type: "image", type: "upload", to_type: "authenticated", invalidate: true, overwrite: false });
      await posts.updateOne({ _id: post._id }, { $set: { cloudinaryPublicId: publicId, cloudinaryDeliveryType: "authenticated" } });
    }
    migrated += 1;
  } catch (error) {
    skipped += 1;
    console.error("Asset migration failed", String(post._id), error instanceof Error ? error.message : "unknown error");
  }
}

await mongoose.disconnect();
console.log(JSON.stringify({ apply, migrated, skipped }));
