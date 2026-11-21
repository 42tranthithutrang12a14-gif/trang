import { describe, it, expect } from "vitest";
import batDauJson from "@/content/bat-dau.json";
import {
  filterBatDau,
  flattenUnits,
  isVisible,
  type BatDauContent,
  type ContentStatus,
  type Reviewable,
} from "@/lib/bat-dau";
import { isOfficialSourceUrl } from "@/lib/content/validate-source";

const CONTENT = batDauJson as BatDauContent;

function withStatus<T extends Reviewable>(unit: T, status: ContentStatus): T {
  return { ...unit, status };
}

function mixedContent(): BatDauContent {
  const { pillars, annual, principle, mistakes } = CONTENT;
  return {
    ...CONTENT,
    pillars: {
      ...withStatus(pillars, "published"),
      items: [withStatus(pillars.items[0], "published"), ...pillars.items.slice(1)],
    },
    annual: {
      ...withStatus(annual, "published"),
      items: [
        withStatus(annual.items[0], "archived"),
        withStatus(annual.items[1], "published"),
        withStatus(annual.items[2], "in_review"),
        ...annual.items.slice(3),
      ],
    },
    principle: withStatus(principle, "published"),
    mistakes: { ...mistakes, items: mistakes.items.map((m) => withStatus(m, "published")) },
  };
}

describe("bat-dau.json", () => {
  it("BD1: mọi mục draft đều có sample_notice MẪU – CHƯA XÁC MINH", () => {
    const drafts = flattenUnits(CONTENT).filter((unit) => unit.status === "draft");
    expect(drafts.length).toBeGreaterThan(0);
    for (const unit of drafts) {
      expect(unit.sample_notice).toContain("MẪU – CHƯA XÁC MINH");
    }
  });

  it("BD2: legal_basis chỉ dùng nguồn chính thức", () => {
    for (const unit of flattenUnits(CONTENT)) {
      for (const basis of unit.legal_basis) {
        expect(isOfficialSourceUrl(basis.url)).toBe(true);
      }
    }
  });
});

describe("isVisible", () => {
  it("BD3: published luôn hiện, archived không bao giờ hiện", () => {
    for (const preview of [true, false]) {
      expect(isVisible("published", preview)).toBe(true);
      expect(isVisible("archived", preview)).toBe(false);
    }
  });

  it("BD4: draft, in_review, reviewed chỉ hiện khi bật preview", () => {
    for (const status of ["draft", "in_review", "reviewed"] as const) {
      expect(isVisible(status, false)).toBe(false);
      expect(isVisible(status, true)).toBe(true);
    }
  });
});

describe("filterBatDau", () => {
  it("BD5: tắt preview thì nội dung thật không hiện mục nào chưa published", () => {
    const units = flattenUnits(filterBatDau(CONTENT, false));
    expect(units.every((unit) => unit.status === "published")).toBe(true);
  });

  it("BD6: tắt preview thì chỉ còn mục published trong phần published", () => {
    const visible = filterBatDau(mixedContent(), false);
    expect(visible.pillars?.items.map((i) => i.id)).toEqual([CONTENT.pillars.items[0].id]);
    expect(visible.annual?.items.map((i) => i.id)).toEqual([CONTENT.annual.items[1].id]);
    expect(visible.principle).not.toBeNull();
    expect(visible.year_one).toBeNull();
    expect(flattenUnits(visible).every((unit) => unit.status === "published")).toBe(true);
  });

  it("BD7: phần chưa published thì ẩn cả mục published bên trong", () => {
    expect(filterBatDau(mixedContent(), false).mistakes).toBeNull();
  });

  it("BD8: phần published nhưng không có mục published thì ẩn", () => {
    const content = { ...CONTENT, year_one: withStatus(CONTENT.year_one, "published") };
    expect(filterBatDau(content, false).year_one).toBeNull();
  });

  it("BD9: bật preview thì hiện cả mục nháp, trừ mục archived", () => {
    const visible = filterBatDau(mixedContent(), true);
    expect(visible.year_one?.items).toHaveLength(CONTENT.year_one.items.length);
    expect(visible.mistakes?.items).toHaveLength(CONTENT.mistakes.items.length);
    expect(visible.annual?.items.map((i) => i.id)).not.toContain(CONTENT.annual.items[0].id);
    expect(visible.annual?.items).toHaveLength(CONTENT.annual.items.length - 1);
  });
});
