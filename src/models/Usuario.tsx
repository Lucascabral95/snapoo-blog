import mongoose from "mongoose";

interface IUsuarios extends mongoose.Document {
  email: string;
  password?: string;
  userName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
}

const usuarioSchema = new mongoose.Schema<IUsuarios>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, select: false },
  userName: { type: String, unique: true, trim: true },
  avatar: { type: String, default: "" },
  emailVerifiedAt: { type: Date },
}, { timestamps: true });

const Usuarios = mongoose.models.Usuarios || mongoose.model<IUsuarios>("Usuarios", usuarioSchema);
export default Usuarios;
