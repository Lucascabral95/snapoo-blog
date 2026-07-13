import "server-only";

import crypto from "node:crypto";
import AuthToken, { type AuthTokenPurpose } from "@/models/AuthToken";
import mongo from "@/services/mongoDB";

function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function createAuthToken(userId: string, purpose: AuthTokenPurpose, ttlMs: number): Promise<string> {
  await mongo();
  const token = crypto.randomBytes(32).toString("hex");
  await AuthToken.deleteMany({ user: userId, purpose });
  await AuthToken.create({ tokenHash: hashToken(token), user: userId, purpose, expiresAt: new Date(Date.now() + ttlMs) });
  return token;
}

export async function consumeAuthToken(token: string, purpose: AuthTokenPurpose) {
  await mongo();
  return AuthToken.findOneAndDelete({ tokenHash: hashToken(token), purpose, expiresAt: { $gt: new Date() }, usedAt: { $exists: false } });
}
