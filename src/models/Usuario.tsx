import mongoose from "mongoose";

interface IUsuarios extends mongoose.Document {
  email: string;
  password?: string;
  userName?: string;
  avatar?: string;
  emailVerifiedAt?: Date;
  role: "user" | "moderator" | "admin";
  accountStatus: "active" | "suspended" | "deactivated";
  suspendedUntil?: Date;
  suspensionReason?: string;
  deactivatedAt?: Date;
  scheduledPurgeAt?: Date;
  isPrivate: boolean;
  acceptsMessages: boolean;
  sessionVersion: number;
}

const usuarioSchema = new mongoose.Schema<IUsuarios>({
  email: { type: String, required: true, unique: true, trim: true, lowercase: true },
  password: { type: String, select: false },
  userName: { type: String, unique: true, trim: true },
  avatar: { type: String, default: "" },
  emailVerifiedAt: { type: Date },
  role: { type: String, enum: ["user", "moderator", "admin"], default: "user", index: true },
  accountStatus: { type: String, enum: ["active", "suspended", "deactivated"], default: "active", index: true },
  suspendedUntil: { type: Date, index: true },
  suspensionReason: { type: String, maxlength: 160 },
  deactivatedAt: { type: Date },
  scheduledPurgeAt: { type: Date, index: true },
  isPrivate: { type: Boolean, default: false },
  acceptsMessages: { type: Boolean, default: true },
  sessionVersion: { type: Number, default: 1, min: 1 },
}, { timestamps: true });

const Usuarios = mongoose.models.Usuarios || mongoose.model<IUsuarios>("Usuarios", usuarioSchema);
export default Usuarios;
