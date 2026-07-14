import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("@/models/ReauthenticationChallenge", () => ({ default: {} }));
vi.mock("@/models/UserSession", () => ({ default: {} }));
vi.mock("@/services/mongoDB", () => ({ default: vi.fn() }));
import { describeDevice, hashIp } from "./security";

describe("account security helpers", () => {
  it("derives a privacy-preserving, stable IP fingerprint", () => {
    expect(hashIp("203.0.113.20")).toMatch(/^[a-f0-9]{64}$/);
    expect(hashIp("203.0.113.20")).toBe(hashIp("203.0.113.20"));
    expect(hashIp("203.0.113.20")).not.toBe("203.0.113.20");
  });

  it("summarizes a browser without retaining the full user agent", () => {
    const device = describeDevice("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit Chrome/120.0 Safari/537.36");
    expect(device).toBe("Chrome en Windows");
    expect(device).not.toContain("Mozilla");
  });
});
