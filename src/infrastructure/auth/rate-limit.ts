import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { getLoginAttemptLimit, getRegisterAttemptLimit } from "./rate-limit-config";

const redis = Redis.fromEnv();
const limiters = {
  register: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(getRegisterAttemptLimit(), "1 h"), prefix: "snapoo:register" }),
  login: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(getLoginAttemptLimit(), "1 h"), prefix: "snapoo:login" }),
  recovery: new Ratelimit({ redis, limiter: Ratelimit.slidingWindow(3, "1 h"), prefix: "snapoo:recovery" }),
};

export async function checkRateLimit(kind: keyof typeof limiters, identifier: string): Promise<boolean> {
  const result = await limiters[kind].limit(identifier);
  return result.success;
}

export function requestIdentifier(request: Request): string {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "unknown";
}
