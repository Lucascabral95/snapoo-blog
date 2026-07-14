import mongoose from "mongoose";

export const SUPPORT_CATEGORIES = ["account", "security", "privacy", "technical", "other"] as const;
export const SUPPORT_PRIORITIES = ["normal", "high"] as const;
export const SUPPORT_STATUSES = ["open", "in_progress", "resolved", "closed"] as const;
export type SupportTicketStatus = typeof SUPPORT_STATUSES[number];

interface SupportTicketDocument extends mongoose.Document {
  user: mongoose.Types.ObjectId;
  category: typeof SUPPORT_CATEGORIES[number];
  priority: typeof SUPPORT_PRIORITIES[number];
  subject: string;
  message: string;
  status: SupportTicketStatus;
  assignedTo?: mongoose.Types.ObjectId;
  resolvedAt?: Date;
  closedAt?: Date;
}

const schema = new mongoose.Schema<SupportTicketDocument>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  category: { type: String, enum: SUPPORT_CATEGORIES, required: true },
  priority: { type: String, enum: SUPPORT_PRIORITIES, default: "normal", index: true },
  subject: { type: String, required: true, trim: true, maxlength: 140 },
  message: { type: String, required: true, trim: true, maxlength: 4000 },
  status: { type: String, enum: SUPPORT_STATUSES, default: "open", index: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", index: true },
  resolvedAt: { type: Date },
  closedAt: { type: Date },
}, { timestamps: true });
schema.index({ status: 1, priority: -1, createdAt: 1 });
schema.index({ user: 1, createdAt: -1 });
export default mongoose.models.SupportTicket || mongoose.model<SupportTicketDocument>("SupportTicket", schema);
