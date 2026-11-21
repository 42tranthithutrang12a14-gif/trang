import { describe, it, expect } from "vitest";
import loTrinhJson from "@/content/lo-trinh.json";
import tu0Den1Json from "@/content/tu-0-den-1.json";
import { nextStep, stepsForStage, visibleRoutines, type RoadmapContent } from "@/lib/lo-trinh";
import type { Tu0Den1Content } from "@/lib/tu-0-den-1";

const CONTENT = loTrinhJson as RoadmapContent;
const CHECKLIST = (tu0Den1Json as Tu0Den1Content).stages;

describe("lo-trinh.json", () => {
  it("LT1: mỗi giai đoạn của Từ 0 - đến 1 thuộc đúng một giai đoạn lộ trình", () => {
    const mapped = CONTENT.stages.flatMap((stage) => stage.checklist_stages);
    expect([...mapped].sort()).toEqual(CHECKLIST.map((stage) => stage.id).sort());
  });

  it("LT2: mọi việc định kỳ nháp đều có sample_notice, link công cụ là link trong web", () => {
    expect(CONTENT.routines.length).toBeGreaterThan(0);
    for (const routine of CONTENT.routines) {
      if (routine.status === "draft") expect(routine.sample_notice).toContain("MẪU – CHƯA XÁC MINH");
      if (routine.tool) expect(routine.tool.href.startsWith("/")).toBe(true);
      expect(routine.how.length).toBeGreaterThan(0);
    }
  });

  it("LT3: tắt preview thì không hiện việc định kỳ chưa published", () => {
    expect(visibleRoutines(CONTENT, false).every((routine) => routine.status === "published")).toBe(true);
    expect(visibleRoutines(CONTENT, true)).toHaveLength(CONTENT.routines.length);
  });
});

describe("stepsForStage / nextStep", () => {
  const stage = CONTENT.stages[0];
  const steps = stepsForStage(stage, CHECKLIST);
  const ids = steps.map((step) => step.id);

  it("LT4: gom việc theo đúng thứ tự các giai đoạn con", () => {
    const expected = CHECKLIST.filter((part) => stage.checklist_stages.includes(part.id)).flatMap((part) =>
      part.steps.map((step) => step.id),
    );
    expect(ids).toEqual(expected);
    expect(stepsForStage(CONTENT.stages[CONTENT.stages.length - 1], CHECKLIST)).toEqual([]);
  });

  it("LT5: việc tiếp theo là việc đầu tiên chưa xong", () => {
    expect(nextStep(steps, [], [])?.id).toBe(ids[0]);
    expect(nextStep(steps, [ids[0], ids[2]], [])?.id).toBe(ids[1]);
  });

  it("LT6: bấm Để sau thì sang việc khác; hết việc khác thì quay lại việc đã để sau", () => {
    expect(nextStep(steps, [], [ids[0]])?.id).toBe(ids[1]);
    expect(nextStep(steps, ids.slice(1), [ids[0]])?.id).toBe(ids[0]);
  });

  it("LT7: xong hết thì không còn việc tiếp theo", () => {
    expect(nextStep(steps, ids, [])).toBeUndefined();
  });
});
