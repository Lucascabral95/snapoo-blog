import mongoose from "mongoose";

export const MODERATION_ACTION_TYPES = ["dismiss", "remove_content", "restore_content", "suspend_account"] as const;

interface ModerationActionDocument extends mongoose.Document {
  report: mongoose.Types.ObjectId;
  actor: mongoose.Types.ObjectId;
  targetType: "post" | "comment" | "user";
  targetId: mongoose.Types.ObjectId;
  type: typeof MODERATION_ACTION_TYPES[number];
  reason: string;
  internalNote: string;
  metadata?: Record<string, unknown>;
  retentionUntil?: Date;
}

const moderationActionSchema = new mongoose.Schema<ModerationActionDocument>({
  report: { type: mongoose.Schema.Types.ObjectId, ref: "ModerationReport", required: true, index: true },
  actor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  targetType: { type: String, enum: ["post", "comment", "user"], required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true },
  type: { type: String, enum: MODERATION_ACTION_TYPES, required: true },
  reason: { type: String, required: true, maxlength: 160 },
  internalNote: { type: String, required: true, maxlength: 1000 },
  metadata: { type: mongoose.Schema.Types.Mixed },
  retentionUntil: { type: Date, index: true },
}, { timestamps: true });

moderationActionSchema.index({ retentionUntil: 1 }, { expireAfterSeconds: 0 });

const ModerationAction = mongoose.models.ModerationAction || mongoose.model<ModerationActionDocument>("ModerationAction", moderationActionSchema);
export default ModerationAction;
