import "server-only";

import mongoose from "mongoose";
import UserNotification from "@/models/UserNotification";
import UserBlock from "@/models/UserBlock";

export type SocialNotificationType = "post_like" | "post_comment" | "comment_reply" | "user_follow";

export function socialNotificationExpiry(): Date {
  const retentionDays = Number(process.env.SOCIAL_NOTIFICATION_RETENTION_DAYS ?? 90);
  const days = Number.isFinite(retentionDays) && retentionDays > 0 ? retentionDays : 90;
  return new Date(Date.now() + days * 86_400_000);
}

export async function usersAreBlocked(firstUserId: string, secondUserId: string): Promise<boolean> {
  return Boolean(await UserBlock.exists({ $or: [{ blocker: firstUserId, blocked: secondUserId }, { blocker: secondUserId, blocked: firstUserId }] }));
}

export async function createSocialNotification(input: { recipient: string; actor: string; type: SocialNotificationType; resourceType: "post" | "comment" | "profile"; resourceId: string; href: string }) {
  if (input.recipient === input.actor || await usersAreBlocked(input.recipient, input.actor)) return;
  const grouped = input.type === "post_like" || input.type === "user_follow";
  if (grouped) {
    await UserNotification.findOneAndUpdate(
      { recipient: input.recipient, type: input.type, resourceId: input.resourceId, createdAt: { $gte: new Date(Date.now() - 86_400_000) } },
      { $addToSet: { actors: new mongoose.Types.ObjectId(input.actor) }, $set: { href: input.href, resourceType: input.resourceType, expiresAt: socialNotificationExpiry() }, $setOnInsert: { recipient: input.recipient, resourceId: input.resourceId, title: "", body: "" } },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    return;
  }
  await UserNotification.create({ recipient: input.recipient, actor: input.actor, actors: [input.actor], type: input.type, resourceType: input.resourceType, resourceId: input.resourceId, href: input.href, title: "", body: "", expiresAt: socialNotificationExpiry() });
}

export async function removeGroupedSocialNotification(input: { recipient: string; actor: string; type: "post_like" | "user_follow"; resourceId: string }) {
  const notification = await UserNotification.findOneAndUpdate({ recipient: input.recipient, type: input.type, resourceId: input.resourceId }, { $pull: { actors: new mongoose.Types.ObjectId(input.actor) } }, { new: true });
  if (notification && notification.actors.length === 0) await notification.deleteOne();
}
