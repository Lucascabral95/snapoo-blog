import mongoose from "mongoose";

export type AuthTokenPurpose = "email-verification" | "password-reset";

interface AuthTokenDocument extends mongoose.Document {
  tokenHash: string;
  user: mongoose.Types.ObjectId;
  purpose: AuthTokenPurpose;
  expiresAt: Date;
  usedAt?: Date;
}

const authTokenSchema = new mongoose.Schema<AuthTokenDocument>({
  tokenHash: { type: String, required: true, unique: true, index: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  purpose: { type: String, enum: ["email-verification", "password-reset"], required: true },
  expiresAt: { type: Date, required: true, index: true },
  usedAt: { type: Date },
}, { timestamps: true });

authTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AuthToken = mongoose.models.AuthToken || mongoose.model<AuthTokenDocument>("AuthToken", authTokenSchema);
export default AuthToken;
