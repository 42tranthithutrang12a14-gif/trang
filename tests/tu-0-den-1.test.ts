import { describe, it, expect } from "vitest";
import tu0Den1Json from "@/content/tu-0-den-1.json";
import type { ContentStatus, Reviewable } from "@/lib/bat-dau";
import {
  countDone,
  filterIncentives,
  filterStages,
  parseDone,
  toggleDone,
  type ChecklistStage,
  type Tu0Den1Content,
} from "@/lib/tu-0-den-1";
import { isOfficialSourceUrl } from "@/lib/content/validate-source";

const CONTENT = tu0Den1Json as Tu0Den1Content;
const STEPS = CONTENT.stages.flatMap((stage) => stage.steps);
const UNITS: Reviewable[] = [
  ...CONTENT.stages.flatMap((stage) => [stage, ...stage.steps]),
  CONTENT.incentives,
  ...CONTENT.incentives.items,
];

function withStatus<T extends Reviewable>(unit: T, status: ContentStatus): T {
  return { ...unit, status };
}

function mixedStages(): ChecklistStage[] {
  const [first, second, ...rest] = CONTENT.stages;
  return [
    {
      ...withStatus(first, "published"),
      steps: [
        withStatus(first.steps[0], "published"),
        withStatus(first.steps[1], "archived"),
        ...first.steps.slice(2),
      ],
    },
    { ...second, steps: second.steps.map((step) => withStatus(step, "published")) },
    ...rest,
  ];
}

describe("tu-0-den-1.json", () => {
  it("TD1: mọi mục draft đều có sample_notice MẪU – CHƯA XÁC MINH", () => {
    const drafts = UNITS.filter((unit) => unit.status === "draft");
    expect(drafts.length).toBeGreaterThan(0);
    for (const unit of drafts) {
      expect(unit.sample_notice).toContain("MẪU – CHƯA XÁC MINH");
    }
  });

  it("TD2: link và legal_basis chỉ dùng nguồn chính thức", () => {
    const urls = [
      ...STEPS.flatMap((step) => step.links.map((link) => link.url)),
      ...CONTENT.incentives.items.flatMap((item) => item.links.map((link) => link.url)),
      ...UNITS.flatMap((unit) => unit.legal_basis.map((basis) => basis.url)),
    ];
    expect(urls.length).toBeGreaterThan(0);
    for (const url of urls) {
      expect(isOfficialSourceUrl(url)).toBe(true);
    }
  });

  it("TD3: id các bước không trùng nhau (dùng để lưu dấu tích)", () => {
    const ids = STEPS.map((step) => step.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("filterStages / filterIncentives", () => {
  it("TD4: tắt preview thì nội dung thật không hiện mục nào chưa published", () => {
    const stages = filterStages(CONTENT.stages, false);
    const incentives = filterIncentives(CONTENT.incentives, false);
    const visible = [
      ...stages.flatMap((stage) => [stage, ...stage.steps]),
      ...(incentives ? [incentives, ...incentives.items] : []),
    ];
    expect(visible.every((unit) => unit.status === "published")).toBe(true);
  });

  it("TD5: tắt preview thì chỉ còn bước published trong giai đoạn published", () => {
    const visible = filterStages(mixedStages(), false);
    expect(visible.map((stage) => stage.id)).toEqual([CONTENT.stages[0].id]);
    expect(visible[0].steps.map((step) => step.id)).toEqual([CONTENT.stages[0].steps[0].id]);
  });

  it("TD6: bật preview thì hiện bước nháp, trừ bước archived", () => {
    const visible = filterStages(mixedStages(), true);
    expect(visible).toHaveLength(CONTENT.stages.length);
    expect(visible[0].steps).toHaveLength(CONTENT.stages[0].steps.length - 1);
    expect(visible[0].steps.map((step) => step.id)).not.toContain(CONTENT.stages[0].steps[1].id);
  });

  it("TD7: phần ưu đãi chỉ hiện mục published, và ẩn hẳn khi phần chưa published", () => {
    const { incentives } = CONTENT;
    const published = {
      ...withStatus(incentives, "published"),
      items: [withStatus(incentives.items[0], "published"), ...incentives.items.slice(1)],
    };
    expect(filterIncentives(published, false)?.items.map((item) => item.id)).toEqual([incentives.items[0].id]);
    const draftSection = { ...incentives, items: incentives.items.map((item) => withStatus(item, "published")) };
    expect(filterIncentives(draftSection, false)).toBeNull();
  });
});

describe("dấu tích", () => {
  it("TD8: parseDone bỏ qua dữ liệu hỏng", () => {
    expect(parseDone("")).toEqual([]);
    expect(parseDone("không phải json")).toEqual([]);
    expect(parseDone('{"a":1}')).toEqual([]);
    expect(parseDone('["dat-ten",3,null,"gop-von"]')).toEqual(["dat-ten", "gop-von"]);
  });

  it("TD9: toggleDone thêm rồi bỏ", () => {
    expect(toggleDone([], "a")).toEqual(["a"]);
    expect(toggleDone(["a", "b"], "a")).toEqual(["b"]);
  });

  it("TD10: countDone chỉ đếm bước đang hiện", () => {
    const shown = STEPS.slice(0, 3);
    expect(countDone(shown, [shown[0].id, "khong-ton-tai", STEPS[5].id])).toBe(1);
  });
});
