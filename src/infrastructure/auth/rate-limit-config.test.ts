import { describe, expect, it } from "vitest";
import { getLoginAttemptLimit, getRegisterAttemptLimit } from "./rate-limit-config";

describe("getLoginAttemptLimit", () => {
    it("uses the configured positive integer", () => {
        expect(getLoginAttemptLimit("20")).toBe(20);
    });

    it("uses the safe default for missing or invalid values", () => {
        expect(getLoginAttemptLimit()).toBe(20);
        expect(getLoginAttemptLimit("0")).toBe(20);
        expect(getLoginAttemptLimit("invalid")).toBe(20);
        expect(getLoginAttemptLimit("101")).toBe(20);
    });
});

describe("getRegisterAttemptLimit", () => {
    it("uses its own configured value", () => {
        expect(getRegisterAttemptLimit("20", "5")).toBe(20);
    });

    it("uses the login limit as a backwards-compatible fallback", () => {
        expect(getRegisterAttemptLimit(undefined, "20")).toBe(20);
    });

    it("uses the safe default when both values are invalid", () => {
        expect(getRegisterAttemptLimit("0", "invalid")).toBe(20);
    });
});
