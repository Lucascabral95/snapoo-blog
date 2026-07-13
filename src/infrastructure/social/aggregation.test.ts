import { describe, expect, it } from "vitest";
import { canGroupSocialEvents, socialGroupLabel } from "./aggregation";
const event = (overrides = {}) => ({ type: "post_like" as const, resourceId: "post-1", createdAt: new Date("2026-01-01T12:00:00Z"), ...overrides });
describe("social notification grouping", () => {
  it("groups same-type events on the same resource within 24 hours", () => { expect(canGroupSocialEvents(event(), event({ createdAt: new Date("2026-01-02T11:59:59Z") }))).toBe(true); });
  it("does not group different resources, types, or expired windows", () => { expect(canGroupSocialEvents(event(), event({ resourceId: "post-2" }))).toBe(false); expect(canGroupSocialEvents(event(), event({ type: "user_follow" }))).toBe(false); expect(canGroupSocialEvents(event(), event({ createdAt: new Date("2026-01-02T12:00:01Z") }))).toBe(false); });
  it("formats actor labels", () => { expect(socialGroupLabel(["Ana"])).toBe("Ana"); expect(socialGroupLabel(["Ana", "Bruno"])).toBe("Ana y Bruno"); expect(socialGroupLabel(["Ana", "Bruno", "Carla", "Dani"])).toBe("Ana, Bruno y 2 personas más"); });
});
