import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import DAOPosteos from "@/DAO/PosteosDAO";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY,
});

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder: "uploads" },
      (error, result) => {
        if (error) return reject(error);
        if (result) resolve(result);
      }
    );
    uploadStream.end(buffer);
  });
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const image = data.get("file");

    const descripcion = data.get("comentario");
    const idUsuario = data.get("id");

    if (!image || !(image instanceof Blob)) {
      return NextResponse.json(
        { error: "No se recibió ninguna imagen válida" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToCloudinary(buffer);
    console.log(result.url);


    if (result.url === undefined) {
      return NextResponse.json(
        { error: "Error al cargar la imagen en Cloudinary" },
        { status: 500 }
      );
    }

    const posteo = await DAOPosteos.createPost({
      likes: 0,
      usuario: idUsuario,
      imagen: result.url,
      descripcion: descripcion,
    });

    return NextResponse.json({ message: posteo }, { status: 200 });
  } catch (error) {
    console.error("Error al cargar la imagen en Cloudinary:", error);
    return NextResponse.json(
      { error: "Error al cargar la imagen en Cloudinary" },
      { status: 500 }
    );
  }
}
