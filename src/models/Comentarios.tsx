import mongoose from "mongoose";

interface IComentarios extends mongoose.Document {
     emisor: string;
     posteo: string;
     usuario: mongoose.Schema.Types.ObjectId;
     likes: number;
     contenido: string;
     moderationState: "active" | "removed";
     removedAt?: Date;
     removedBy?: mongoose.Schema.Types.ObjectId;
     removalReason?: string;
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
    },
    moderationState: { type: String, enum: ["active", "removed"], default: "active", index: true },
    removedAt: { type: Date },
    removedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
    removalReason: { type: String, maxlength: 160 },
})

comentariosSchema.index({ posteo: 1, moderationState: 1 });

const Comentarios = mongoose.models.Comentarios as mongoose.Model<IComentarios> || mongoose.model<IComentarios>("Comentarios", comentariosSchema);
export default Comentarios;
