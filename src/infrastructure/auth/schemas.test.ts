import { describe, expect, it } from "vitest";
import { loginSchema, registerSchema } from "./schemas";

describe("authentication schemas", () => {
  it("accepts a valid registration and normalizes the email", () => {
    const result = registerSchema.safeParse({ email: " User@Example.com ", userName: "snapoo.user", password: "correct horse battery staple", confirmPassword: "correct horse battery staple" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("user@example.com");
  });

  it("rejects a short password and mismatched confirmation", () => {
    const result = registerSchema.safeParse({ email: "user@example.com", userName: "user", password: "short", confirmPassword: "different" });
    expect(result.success).toBe(false);
    if (!result.success) expect(result.error.issues.map((issue) => issue.path[0])).toEqual(expect.arrayContaining(["password", "confirmPassword"]));
  });

  it("rejects invalid usernames", () => {
    expect(registerSchema.safeParse({ email: "user@example.com", userName: "bad name", password: "correct horse battery staple", confirmPassword: "correct horse battery staple" }).success).toBe(false);
  });

  it("accepts a valid login and normalizes the email", () => {
    const result = loginSchema.safeParse({ email: " USER@example.com ", password: "secret" });
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.email).toBe("user@example.com");
  });
});
