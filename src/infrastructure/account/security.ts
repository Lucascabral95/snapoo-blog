import "server-only";

import crypto from "node:crypto";
import ReauthenticationChallenge from "@/models/ReauthenticationChallenge";
import UserSession from "@/models/UserSession";
import mongo from "@/services/mongoDB";

const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const REAUTH_DURATION_MS = 10 * 60 * 1000;

function hash(value: string): string { return crypto.createHash("sha256").update(value).digest("hex"); }
export function hashIp(value?: string | null): string | undefined { return value ? hash(value) : undefined; }
export function describeDevice(userAgent?: string | null): string {
  if (!userAgent) return "Navegador desconocido";
  const browser = /edg\//i.test(userAgent) ? "Microsoft Edge" : /firefox\//i.test(userAgent) ? "Firefox" : /chrome\//i.test(userAgent) ? "Chrome" : /safari\//i.test(userAgent) ? "Safari" : "Navegador";
  const platform = /iphone|ipad|android/i.test(userAgent) ? "móvil" : /windows/i.test(userAgent) ? "Windows" : /mac os/i.test(userAgent) ? "macOS" : /linux/i.test(userAgent) ? "Linux" : "desconocido";
  return `${browser} en ${platform}`;
}

export async function createUserSession(userId: string, sessionId: string, sessionVersion: number): Promise<void> {
  await mongo();
  await UserSession.create({ user: userId, sessionId, sessionVersion, device: "Navegador desconocido", lastActiveAt: new Date(), expiresAt: new Date(Date.now() + SESSION_DURATION_MS) });
}

export async function recordSessionActivity(userId: string, sessionId: string | undefined, requestHeaders: Headers): Promise<void> {
  if (!sessionId) return;
  await mongo();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip")?.trim();
  const ipHash = hashIp(ip);
  await UserSession.updateOne(
    { user: userId, sessionId, revokedAt: { $exists: false }, expiresAt: { $gt: new Date() } },
    { $set: { device: describeDevice(requestHeaders.get("user-agent")), ...(ipHash ? { ipHash } : {}), lastActiveAt: new Date() } },
  );
}

export async function validateUserSession(userId: string, sessionId: string | undefined, sessionVersion: number | undefined): Promise<boolean> {
  if (!sessionId || !sessionVersion) return false;
  await mongo();
  const session = await UserSession.findOne({ user: userId, sessionId, sessionVersion, revokedAt: { $exists: false }, expiresAt: { $gt: new Date() } }).lean() as any;
  if (!session) return false;
  await UserSession.updateOne({ _id: session._id }, { $set: { lastActiveAt: new Date() } });
  return true;
}

export async function revokeSessions(userId: string, exceptSessionId?: string): Promise<void> {
  await mongo();
  const filter: Record<string, unknown> = { user: userId, revokedAt: { $exists: false } };
  if (exceptSessionId) filter.sessionId = { $ne: exceptSessionId };
  await UserSession.updateMany(filter, { $set: { revokedAt: new Date() } });
}

export async function createReauthenticationChallenge(userId: string, sessionId: string): Promise<string> {
  await mongo();
  const token = crypto.randomBytes(32).toString("hex");
  await ReauthenticationChallenge.deleteMany({ user: userId, sessionId });
  await ReauthenticationChallenge.create({ user: userId, sessionId, tokenHash: hash(token), expiresAt: new Date(Date.now() + REAUTH_DURATION_MS) });
  return token;
}

export async function hasValidReauthentication(userId: string, sessionId: string | undefined, token: string | null): Promise<boolean> {
  if (!sessionId || !token || !/^[a-f0-9]{64}$/i.test(token)) return false;
  await mongo();
  return Boolean(await ReauthenticationChallenge.exists({ user: userId, sessionId, tokenHash: hash(token), expiresAt: { $gt: new Date() } }));
}
