import UserBlock from "@/models/UserBlock";
import mongo from "@/services/mongoDB";

export async function getBlockedUserIds(viewerId?: string): Promise<string[]> {
  if (!viewerId) return [];
  await mongo();
  const blocks = await UserBlock.find({ $or: [{ blocker: viewerId }, { blocked: viewerId }] }).lean();
  return blocks.map((block) => String(String(block.blocker) === viewerId ? block.blocked : block.blocker));
}
