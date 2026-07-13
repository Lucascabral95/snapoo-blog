import mongoose from "mongoose";

interface IUsuarios extends mongoose.Document {
  email: string;
  password?: string;
  userName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
  role: "user" | "moderator" | "admin";
  accountStatus: "active" | "suspended";
  suspendedUntil?: Date;
  suspensionReason?: string;
}

const usuarioSchema = new mongoose.Schema<IUsuarios>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, select: false },
  userName: { type: String, unique: true, trim: true },
  avatar: { type: String, default: "" },
  emailVerifiedAt: { type: Date },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user", index: true },
  accountStatus: { type: String, enum: ["active", "suspended"], default: "active", index: true },
  suspendedUntil: { type: Date, index: true },
  suspensionReason: { type: String, maxlength: 160 },
}, { timestamps: true });

const Usuarios = mongoose.models.Usuarios || mongoose.model<IUsuarios>("Usuarios", usuarioSchema);
export default Usuarios;
