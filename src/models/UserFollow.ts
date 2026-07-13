import mongoose from "mongoose";

const userFollowSchema = new mongoose.Schema({
  follower: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
  followed: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
}, { timestamps: true });

userFollowSchema.index({ follower: 1, followed: 1 }, { unique: true });

const UserFollow = mongoose.models.UserFollow || mongoose.model("UserFollow", userFollowSchema);
export default UserFollow;
