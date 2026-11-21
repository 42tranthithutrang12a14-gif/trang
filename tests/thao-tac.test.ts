import { existsSync } from "node:fs";
import path from "node:path";
import { describe, it, expect } from "vitest";
import thaoTacJson from "@/content/thao-tac.json";
import tu0Den1Json from "@/content/tu-0-den-1.json";
import { isOfficialSourceUrl } from "@/lib/content/validate-source";
import { guideLinksByStep, visibleGuides, type ThaoTacContent } from "@/lib/thao-tac";
import type { Tu0Den1Content } from "@/lib/tu-0-den-1";

const CONTENT = thaoTacJson as ThaoTacContent;
const STEP_IDS = (tu0Den1Json as Tu0Den1Content).stages.flatMap((stage) => stage.steps.map((step) => step.id));

describe("thao-tac.json", () => {
  it("TT1: mọi hướng dẫn nháp đều có sample_notice MẪU – CHƯA XÁC MINH", () => {
    const drafts = CONTENT.guides.filter((guide) => guide.status === "draft");
    expect(drafts.length).toBeGreaterThan(0);
    for (const guide of drafts) {
      expect(guide.sample_notice).toContain("MẪU – CHƯA XÁC MINH");
    }
  });

  it("TT2: cổng và legal_basis chỉ dùng nguồn chính thức", () => {
    for (const guide of CONTENT.guides) {
      expect(isOfficialSourceUrl(guide.portal.url), guide.slug).toBe(true);
      for (const basis of guide.legal_basis) {
        expect(isOfficialSourceUrl(basis.url)).toBe(true);
      }
    }
  });

  it("TT3: slug không trùng, mỗi hướng dẫn có bước và gắn với việc có thật trong Từ 0 - đến 1", () => {
    const slugs = CONTENT.guides.map((guide) => guide.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const guide of CONTENT.guides) {
      expect(guide.steps.length).toBeGreaterThan(0);
      for (const stepId of guide.related_steps) {
        expect(STEP_IDS, `${guide.slug} → ${stepId}`).toContain(stepId);
      }
    }
  });

  it("TT4: ảnh minh họa nằm trong public/thao-tac, có kích thước và mô tả", () => {
    for (const guide of CONTENT.guides) {
      for (const step of guide.steps) {
        if (!step.image) continue;
        expect(step.image.startsWith("/thao-tac/"), step.image).toBe(true);
        expect(existsSync(path.join(process.cwd(), "public", step.image)), step.image).toBe(true);
        expect(step.image_width).toBeGreaterThan(0);
        expect(step.image_height).toBeGreaterThan(0);
        expect(step.image_alt?.length ?? 0).toBeGreaterThan(0);
      }
    }
  });
});

describe("visibleGuides / guideLinksByStep", () => {
  it("TT5: tắt preview thì không hiện hướng dẫn chưa published", () => {
    expect(visibleGuides(CONTENT, false).every((guide) => guide.status === "published")).toBe(true);
    expect(visibleGuides(CONTENT, true)).toHaveLength(CONTENT.guides.length);
  });

  it("TT6: mỗi việc trỏ tới hướng dẫn đầu tiên gắn với nó", () => {
    const [first, second] = CONTENT.guides;
    const guides = [
      { ...first, related_steps: ["viec-a", "viec-b"] },
      { ...second, related_steps: ["viec-b"] },
    ];
    expect(guideLinksByStep(guides)).toEqual({
      "viec-a": { slug: first.slug, title: first.title },
      "viec-b": { slug: first.slug, title: first.title },
    });
  });
});
