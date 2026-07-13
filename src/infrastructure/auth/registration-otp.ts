import "server-only";

import bcrypt from "bcrypt";
import crypto from "node:crypto";
import PendingRegistration from "@/models/PendingRegistration";
import mongo from "@/services/mongoDB";
import { registerSchema, type RegisterInput } from "./schemas";

const OTP_TTL_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 5;

function createOtp(): string {
  return crypto.randomInt(100000, 1000000).toString();
}

export async function startPendingRegistration(input: RegisterInput): Promise<string> {
  await mongo();
  const otp = createOtp();
  const [passwordHash, otpHash] = await Promise.all([bcrypt.hash(input.password, 12), bcrypt.hash(otp, 12)]);
  await PendingRegistration.findOneAndUpdate(
    { $or: [{ email: input.email }, { userName: input.userName }] },
    { email: input.email, userName: input.userName, passwordHash, otpHash, expiresAt: new Date(Date.now() + OTP_TTL_MS), attempts: 0 },
    { upsert: true, new: true, setDefaultsOnInsert: true },
  );
  return otp;
}

export async function consumePendingRegistration(email: string, otp: string) {
  await mongo();
  const pending = await PendingRegistration.findOne({ email }).select("+otpHash +passwordHash");
  if (!pending || pending.expiresAt <= new Date() || pending.attempts >= MAX_ATTEMPTS) return null;
  if (!(await bcrypt.compare(otp, pending.otpHash))) {
    await PendingRegistration.updateOne({ _id: pending._id }, { $inc: { attempts: 1 } });
    return null;
  }
  return PendingRegistration.findOneAndDelete({ _id: pending._id, expiresAt: { $gt: new Date() } }).select("+passwordHash");
}

export function parseRegistrationInput(value: unknown) {
  return registerSchema.safeParse(value);
}
