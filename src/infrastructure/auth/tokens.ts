import "server-only";

import AuthToken, { type AuthTokenPurpose } from "@/models/AuthToken";
import mongo from "@/services/mongoDB";
import crypto from "node:crypto";

function hashToken(token: string): string { return crypto.createHash("sha256").update(token).digest("hex"); }

export async function createAuthToken(userId: string, purpose: AuthTokenPurpose, ttlMs: number, pendingEmail?: string): Promise<string> {
  await mongo();
  const token = crypto.randomBytes(32).toString("hex");
  await AuthToken.deleteMany({ user: userId, purpose });
  await AuthToken.create({ tokenHash: hashToken(token), user: userId, purpose, expiresAt: new Date(Date.now() + ttlMs), pendingEmail });
  return token;
}

export async function consumeAuthToken(token: string, purpose: AuthTokenPurpose) {
  await mongo();
  return AuthToken.findOneAndDelete({ tokenHash: hashToken(token), purpose, expiresAt: { $gt: new Date() } });
}

export async function revokeAuthTokens(userId: string, purpose?: AuthTokenPurpose): Promise<void> {
  await mongo();
  await AuthToken.deleteMany({ user: userId, ...(purpose ? { purpose } : {}) });
}
