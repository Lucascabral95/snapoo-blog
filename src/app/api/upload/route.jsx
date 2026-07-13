import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import DAOPosteos from "@/DAO/PosteosDAO";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";

const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: "uploads", resource_type: "image" }, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
}

export async function POST(request) {
  const user = await getAuthenticatedUser();
  if (!user) return NextResponse.json({ code: "UNAUTHORIZED", message: "Sesión requerida." }, { status: 401 });

  try {
    const data = await request.formData();
    const image = data.get("file");
    if (!(image instanceof Blob) || !ALLOWED_IMAGE_TYPES.has(image.type) || image.size > MAX_IMAGE_BYTES) {
      return NextResponse.json({ code: "INVALID_IMAGE", message: "La imagen no es válida o supera el tamaño permitido." }, { status: 400 });
    }

    const result = await uploadToCloudinary(Buffer.from(await image.arrayBuffer()));
    if (!result?.secure_url) throw new Error("Cloudinary did not return a secure URL");

    const posteo = await DAOPosteos.createPost({
      likes: 0,
      usuario: user.id,
      imagen: result.secure_url,
      cloudinaryPublicId: result.public_id,
      cloudinaryDeliveryType: "upload",
      descripcion: String(data.get("comentario") || "").slice(0, 2000),
      comentarios: [],
    });
    return NextResponse.json({ result: posteo }, { status: 201 });
  } catch (error) {
    console.error("Image upload failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "UPLOAD_ERROR", message: "No se pudo cargar la imagen." }, { status: 500 });
  }
}
