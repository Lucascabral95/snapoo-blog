import mongoose from "mongoose";

interface IComentarios extends mongoose.Document {
     emisor: string;
     posteo: string;
     usuario: mongoose.Schema.Types.ObjectId;
     likes: number;
     contenido: string;
}

const comentariosSchema = new mongoose.Schema<IComentarios>({
    emisor: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        default: 0
    },
    posteo: {
        type: String,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuarios",
        required: true
    },
    contenido: {
        type: String,
    }
})

export default mongoose.models.Comentarios as mongoose.Model<IComentarios> || mongoose.model<IComentarios>("Comentarios", comentariosSchema);