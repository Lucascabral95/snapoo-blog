import mongoose from "mongoose";

interface UserNotificationDocument extends mongoose.Document {
  recipient: mongoose.Types.ObjectId;
  type: "moderation_action";
  title: string;
  body: string;
  readAt?: Date;
  expiresAt: Date;
}

const userNotificationSchema = new mongoose.Schema<UserNotificationDocument>({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  type: { type: String, enum: ["moderation_action"], required: true },
  title: { type: String, required: true, maxlength: 120 },
  body: { type: String, required: true, maxlength: 500 },
  readAt: { type: Date },
  expiresAt: { type: Date, required: true, index: true },
}, { timestamps: true });

userNotificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
userNotificationSchema.index({ recipient: 1, createdAt: -1 });

const UserNotification = mongoose.models.UserNotification || mongoose.model<UserNotificationDocument>("UserNotification", userNotificationSchema);
export default UserNotification;
