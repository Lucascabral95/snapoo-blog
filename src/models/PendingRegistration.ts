import mongoose from "mongoose";

interface PendingRegistrationDocument extends mongoose.Document {
  email: string;
  userName: string;
  passwordHash: string;
  otpHash: string;
  expiresAt: Date;
  attempts: number;
}

const pendingRegistrationSchema = new mongoose.Schema<PendingRegistrationDocument>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  userName: { type: String, required: true, unique: true, trim: true },
  passwordHash: { type: String, required: true, select: false },
  otpHash: { type: String, required: true, select: false },
  expiresAt: { type: Date, required: true },
  attempts: { type: Number, required: true, default: 0 },
}, { timestamps: true });

pendingRegistrationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const PendingRegistration = mongoose.models.PendingRegistration || mongoose.model<PendingRegistrationDocument>("PendingRegistration", pendingRegistrationSchema);
export default PendingRegistration;
