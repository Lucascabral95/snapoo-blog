import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  user: { id: "507f1f77bcf86cd799439011" } as any,
  post: null as any,
  url: vi.fn(),
}));

vi.mock("@/infrastructure/auth/session", () => ({ getActiveAuthenticatedUser: vi.fn(async () => state.user) }));
vi.mock("@/infrastructure/moderation/visibility", () => ({ getBlockedUserIds: vi.fn(async () => []) }));
vi.mock("@/services/mongoDB", () => ({ default: vi.fn(async () => undefined) }));
vi.mock("@/models/Posteos", () => ({ default: { findOne: vi.fn(() => ({ select: () => ({ lean: async () => state.post }) })) } }));
vi.mock("cloudinary", () => ({ v2: { config: vi.fn(), url: state.url } }));

import { GET } from "./route";

describe("post media API", () => {
  beforeEach(() => {
    state.user = { id: "507f1f77bcf86cd799439011" };
    state.post = { imagen: "https://res.cloudinary.com/demo/image/upload/v1/uploads/new.jpg" };
    state.url.mockReset().mockReturnValue("https://signed.example/image.jpg");
  });

  it("redirects migrated images through a signed authenticated URL", async () => {
    state.post = { imagen: "https://old-url.example/image.jpg", cloudinaryPublicId: "uploads/legacy", cloudinaryDeliveryType: "authenticated" };

    const response = await GET(new Request("http://localhost/api/media/posts/507f1f77bcf86cd799439012"), { params: Promise.resolve({ id: "507f1f77bcf86cd799439012" }) });

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://signed.example/image.jpg");
    expect(state.url).toHaveBeenCalledWith("uploads/legacy", { secure: true, type: "authenticated", sign_url: true });
  });

  it("keeps public uploads available through the same media route", async () => {
    const response = await GET(new Request("http://localhost/api/media/posts/507f1f77bcf86cd799439012"), { params: Promise.resolve({ id: "507f1f77bcf86cd799439012" }) });

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(state.post.imagen);
  });
});