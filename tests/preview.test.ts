import { describe, it, expect } from "vitest";
import { isPreviewEnabled } from "@/lib/content/preview";

describe("isPreviewEnabled", () => {
  it("PV1: hiện nội dung nháp ở máy local và bản xem thử Vercel", () => {
    expect(isPreviewEnabled(undefined, undefined)).toBe(true);
    expect(isPreviewEnabled("", undefined)).toBe(true);
    expect(isPreviewEnabled(undefined, "preview")).toBe(true);
    expect(isPreviewEnabled(undefined, "development")).toBe(true);
  });

  it("PV2: bản production ẩn nội dung nháp, trừ khi bật cờ true", () => {
    expect(isPreviewEnabled(undefined, "production")).toBe(false);
    expect(isPreviewEnabled("", "production")).toBe(false);
    expect(isPreviewEnabled("true", "production")).toBe(true);
  });

  it("PV3: cờ false luôn ẩn nội dung nháp", () => {
    expect(isPreviewEnabled("false", undefined)).toBe(false);
    expect(isPreviewEnabled("false", "preview")).toBe(false);
  });
});
