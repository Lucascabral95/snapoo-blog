import mongoose from "mongoose";

interface UserBlockDocument extends mongoose.Document {
  blocker: mongoose.Types.ObjectId;
  blocked: mongoose.Types.ObjectId;
}

const userBlockSchema = new mongoose.Schema<UserBlockDocument>({
  blocker: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
  blocked: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true, index: true },
}, { timestamps: true });

userBlockSchema.index({ blocker: 1, blocked: 1 }, { unique: true });

const UserBlock = mongoose.models.UserBlock || mongoose.model<UserBlockDocument>("UserBlock", userBlockSchema);
export default UserBlock;
