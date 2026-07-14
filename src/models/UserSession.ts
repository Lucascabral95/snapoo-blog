import mongoose from "mongoose";

interface UserSessionDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  sessionId: string;
  device: string;
  ipHash?: string;
  sessionVersion: number;
  lastActiveAt: Date;
  expiresAt: Date;
  revokedAt?: Date;
}

const userSessionSchema = new mongoose.Schema<UserSessionDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  sessionId: { type: String, required: true, unique: true, index: true },
  device: { type: String, required: true, maxlength: 200 },
  ipHash: { type: String, select: false },
  sessionVersion: { type: Number, required: true },
  lastActiveAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true, index: true },
  revokedAt: { type: Date, index: true },
}, { timestamps: true });

userSessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.models.UserSession || mongoose.model<UserSessionDocument>("UserSession", userSessionSchema);
