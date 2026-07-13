import { describe, expect, it } from "vitest";
import { isProtectedRoute, isPublicOnlyRoute } from "./route-policy";

describe("route policy", () => {
    it("redirects authenticated users away from public-only routes", () => {
        expect(isPublicOnlyRoute("/")).toBe(true);
        expect(isPublicOnlyRoute("/login")).toBe(true);
        expect(isPublicOnlyRoute("/register/verify")).toBe(true);
    });

    it("requires a session for every dashboard route", () => {
        expect(isProtectedRoute("/feed")).toBe(true);
        expect(isProtectedRoute("/feed/people")).toBe(true);
        expect(isProtectedRoute("/usuario/perfil/snapoo")).toBe(true);
        expect(isProtectedRoute("/posteo/123")).toBe(false);
    });
});
