import { describe, expect, it } from "vitest";
import { CRITICAL_REPORT_REASONS, getBootstrapAdminEmail, getModerationRetentionDays, getReportLimit } from "./config";

describe("moderation configuration", () => {
  it("marks safety-sensitive reports as critical", () => {
    expect(CRITICAL_REPORT_REASONS.has("child_safety")).toBe(true);
    expect(CRITICAL_REPORT_REASONS.has("spam_scam")).toBe(false);
  });

  it("normalizes the bootstrap administrator email", () => {
    expect(getBootstrapAdminEmail(" Admin@Example.COM " )).toBe("admin@example.com");
    expect(getBootstrapAdminEmail(" " )).toBeNull();
  });

  it("rejects unsafe retention and rate-limit values", () => {
    expect(getModerationRetentionDays("1")).toBe(730);
    expect(getReportLimit("0")).toBe(10);
    expect(getReportLimit("25")).toBe(25);
  });
});
