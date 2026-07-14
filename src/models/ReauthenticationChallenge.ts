import mongoose from "mongoose";

interface ReauthenticationChallengeDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  sessionId: string;
  tokenHash: string;
  expiresAt: Date;
}

const schema = new mongoose.Schema<ReauthenticationChallengeDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  sessionId: { type: String, required: true, index: true },
  tokenHash: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });
schema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
export default mongoose.models.ReauthenticationChallenge || mongoose.model<ReauthenticationChallengeDocument>("ReauthenticationChallenge", schema);
