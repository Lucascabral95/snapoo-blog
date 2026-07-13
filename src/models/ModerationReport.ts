import mongoose from "mongoose";

export const REPORT_TARGET_TYPES = ["post", "comment", "user"] as const;
export const REPORT_REASONS = ["spam_scam", "harassment", "hate_discrimination", "sexual_content", "violence_threats", "child_safety", "self_harm", "intellectual_property", "other"] as const;
export const REPORT_STATUSES = ["open", "in_review", "resolved", "dismissed", "unavailable"] as const;
export type ReportTargetType = typeof REPORT_TARGET_TYPES[number];
export type ReportReason = typeof REPORT_REASONS[number];
export type ReportStatus = typeof REPORT_STATUSES[number];

interface ModerationReportDocument extends mongoose.Document {
  reporter: mongoose.Types.ObjectId;
  targetType: ReportTargetType;
  targetId: mongoose.Types.ObjectId;
  targetAuthor: mongoose.Types.ObjectId;
  reason: ReportReason;
  details?: string;
  targetSnapshot: Record<string, unknown>;
  priority: "normal" | "critical";
  status: ReportStatus;
  assignedTo?: mongoose.Types.ObjectId;
  closedAt?: Date;
  retentionUntil?: Date;
}

const moderationReportSchema = new mongoose.Schema<ModerationReportDocument>({
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  targetType: { type: String, enum: REPORT_TARGET_TYPES, required: true },
  targetId: { type: mongoose.Schema.Types.ObjectId, required: true },
  targetAuthor: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  reason: { type: String, enum: REPORT_REASONS, required: true },
  details: { type: String, maxlength: 1500 },
  targetSnapshot: { type: mongoose.Schema.Types.Mixed, required: true },
  priority: { type: String, enum: ["normal", "critical"], default: "normal", index: true },
  status: { type: String, enum: REPORT_STATUSES, default: "open", index: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", index: true },
  closedAt: { type: Date },
  retentionUntil: { type: Date, index: true },
}, { timestamps: true });

moderationReportSchema.index({ status: 1, priority: -1, createdAt: 1 });
moderationReportSchema.index({ reporter: 1, targetType: 1, targetId: 1 }, { unique: true, partialFilterExpression: { status: { $in: ["open", "in_review"] } } });
moderationReportSchema.index({ retentionUntil: 1 }, { expireAfterSeconds: 0 });

const ModerationReport = mongoose.models.ModerationReport || mongoose.model<ModerationReportDocument>("ModerationReport", moderationReportSchema);
export default ModerationReport;
