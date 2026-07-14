import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  staff: { id: "507f1f77bcf86cd799439011", role: "moderator" } as any,
  ticket: null as any,
  exists: vi.fn(),
}));

vi.mock("@/infrastructure/auth/session", () => ({ getStaffUser: vi.fn(async () => state.staff) }));
vi.mock("@/services/mongoDB", () => ({ default: vi.fn(async () => undefined) }));
vi.mock("@/infrastructure/account/account-status", () => ({ ACTIVE_ACCOUNT_FILTER: { accountStatus: { $nin: ["suspended", "deactivated"] } } }));
vi.mock("@/models/SupportTicket", () => ({ default: { findById: vi.fn(async () => state.ticket) }, SUPPORT_STATUSES: ["open", "in_progress", "resolved", "closed"] }));
vi.mock("@/models/Usuario", () => ({ default: { exists: state.exists } }));

import { PATCH } from "./route";

const ticketId = "507f1f77bcf86cd799439012";

describe("support ticket staff API", () => {
  beforeEach(() => {
    state.staff = { id: "507f1f77bcf86cd799439011", role: "moderator" };
    state.exists.mockResolvedValue({ _id: "507f1f77bcf86cd799439013" });
    state.ticket = { status: "open", save: vi.fn(async () => undefined) };
  });

  it("rejects unauthenticated staff access", async () => {
    state.staff = null;
    const response = await PATCH(new Request("http://localhost/api/admin/support/tickets/" + ticketId, { method: "PATCH", body: JSON.stringify({ status: "in_progress" }) }), { params: Promise.resolve({ id: ticketId }) });
    expect(response.status).toBe(403);
  });

  it("rejects an invalid state transition", async () => {
    state.ticket.status = "closed";
    const response = await PATCH(new Request("http://localhost/api/admin/support/tickets/" + ticketId, { method: "PATCH", body: JSON.stringify({ status: "open" }) }), { params: Promise.resolve({ id: ticketId }) });
    expect(response.status).toBe(409);
  });

  it("assigns a valid staff member and updates the status", async () => {
    const response = await PATCH(new Request("http://localhost/api/admin/support/tickets/" + ticketId, { method: "PATCH", body: JSON.stringify({ status: "in_progress", assignedTo: "507f1f77bcf86cd799439013" }) }), { params: Promise.resolve({ id: ticketId }) });
    expect(response.status).toBe(200);
    expect(state.ticket.status).toBe("in_progress");
    expect(String(state.ticket.assignedTo)).toBe("507f1f77bcf86cd799439013");
    expect(state.ticket.save).toHaveBeenCalledOnce();
  });
});
