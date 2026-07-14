import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  user: { id: "507f1f77bcf86cd799439011", sessionId: "session-1" } as any,
  account: { password: "hash" } as any,
  compare: vi.fn(),
  createChallenge: vi.fn(),
}));

vi.mock("@/infrastructure/auth/session", () => ({ getActiveAuthenticatedUser: vi.fn(async () => state.user) }));
vi.mock("@/infrastructure/auth/rate-limit", () => ({ checkRateLimit: vi.fn(async () => true) }));
vi.mock("@/DAO/UsuarioDAO", () => ({ default: { getUserByID: vi.fn(async () => state.account) } }));
vi.mock("@/infrastructure/account/security", () => ({ createReauthenticationChallenge: state.createChallenge }));
vi.mock("bcrypt", () => ({ default: { compare: state.compare } }));

import { POST } from "./route";

describe("reauthentication API", () => {
  beforeEach(() => {
    state.user = { id: "507f1f77bcf86cd799439011", sessionId: "session-1" };
    state.account = { password: "hash" };
    state.compare.mockReset().mockResolvedValue(true);
    state.createChallenge.mockReset().mockResolvedValue("a".repeat(64));
  });

  it("requires the provider flow for accounts without a local password", async () => {
    state.account = {};
    const response = await POST(new Request("http://localhost/api/account/reauthenticate", { method: "POST", body: JSON.stringify({ password: "unused" }) }));
    expect(response.status).toBe(409);
    expect((await response.json()).code).toBe("GOOGLE_REAUTH_REQUIRED");
  });

  it("rejects an incorrect password", async () => {
    state.compare.mockResolvedValue(false);
    const response = await POST(new Request("http://localhost/api/account/reauthenticate", { method: "POST", body: JSON.stringify({ password: "wrong-password" }) }));
    expect(response.status).toBe(400);
    expect(state.createChallenge).not.toHaveBeenCalled();
  });

  it("creates a ten-minute challenge after credential verification", async () => {
    const response = await POST(new Request("http://localhost/api/account/reauthenticate", { method: "POST", body: JSON.stringify({ password: "correct-password" }) }));
    expect(response.status).toBe(200);
    expect(state.createChallenge).toHaveBeenCalledWith("507f1f77bcf86cd799439011", "session-1");
  });
});
