import mongoose, { Document, Schema } from "mongoose";

interface IPosteos extends Document {
  likes: number;
  usuario: mongoose.Schema.Types.ObjectId;
  comentarios: mongoose.Schema.Types.ObjectId[];
  imagen?: string;
  cloudinaryPublicId?: string;
  cloudinaryDeliveryType?: "upload" | "authenticated";
  descripcion?: string;
  fecha: Date;
  moderationState: "active" | "removed";
  removedAt?: Date;
  removedBy?: mongoose.Schema.Types.ObjectId;
  removalReason?: string;
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
  cloudinaryPublicId: { type: String, index: true },
  cloudinaryDeliveryType: { type: String, enum: ["upload", "authenticated"], default: "upload" },
  descripcion: {
    type: String,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  moderationState: { type: String, enum: ["active", "removed"], default: "active", index: true },
  removedAt: { type: Date },
  removedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios" },
  removalReason: { type: String, maxlength: 160 },
});

posteosSchema.index({ usuario: 1, moderationState: 1, fecha: -1 });

const Posteos =
  mongoose.models.Posteos || mongoose.model<IPosteos>("Posteos", posteosSchema);
export default Posteos;
