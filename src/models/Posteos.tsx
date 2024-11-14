import mongoose, { Document, Schema } from "mongoose";

interface IPosteos extends Document {
    likes: number;
    usuario: mongoose.Schema.Types.ObjectId;
    comentarios: mongoose.Schema.Types.ObjectId[];
    imagen?: string;
    descripcion?: string;
    fecha: Date;
}

const posteosSchema = new Schema<IPosteos>({
    likes: {
        type: Number,
        default: 0,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true,
    },
    comentarios: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comentarios",
        },
    ],
    imagen: {
        type: String,
    },
    descripcion: {
        type: String,
    },
    fecha: {
        type: Date,
        default: Date.now,
    },
});

const Posteos = mongoose.models.Posteos || mongoose.model<IPosteos>("Posteos", posteosSchema);
export default Posteos;
