import { describe, it, expect } from "vitest";
import { evalCondition } from "@/lib/engine/conditions";
import { evaluate } from "@/lib/engine/evaluate";
import { getTodayInVN, applyShift, generateInstances } from "@/lib/engine/schedule";
import type { Answers, ObligationRule, RiskRule, Condition } from "@/lib/engine/types";

// T01: eq true
describe("evalCondition", () => {
  it("T01: eq returns true when field matches", () => {
    const answers: Answers = { tax_method: "khau_tru" };
    expect(evalCondition({ field: "tax_method", op: "eq", value: "khau_tru" }, answers)).toBe(true);
  });

  // T02: eq false
  it("T02: eq returns false when field does not match", () => {
    const answers: Answers = { tax_method: "truc_tiep" };
    expect(evalCondition({ field: "tax_method", op: "eq", value: "khau_tru" }, answers)).toBe(false);
  });

  // T03: unknown when value is khong_biet
  it("T03: eq returns unknown when value is khong_biet", () => {
    const answers: Answers = { tax_method: "khong_biet" };
    expect(evalCondition({ field: "tax_method", op: "eq", value: "khau_tru" }, answers)).toBe("unknown");
  });

  // T04: unknown when field missing
  it("T04: eq returns unknown when field is missing", () => {
    const answers: Answers = {};
    expect(evalCondition({ field: "tax_method", op: "eq", value: "khau_tru" }, answers)).toBe("unknown");
  });

  // T05: all — false if any child false
  it("T05: all returns false if any child is false", () => {
    const answers: Answers = { a: "yes", b: "no" };
    const cond: Condition = {
      all: [
        { field: "a", op: "eq", value: "yes" },
        { field: "b", op: "eq", value: "yes" },
      ],
    };
    expect(evalCondition(cond, answers)).toBe(false);
  });

  // T06: all — unknown if no false but has unknown
  it("T06: all returns unknown if no false but has unknown", () => {
    const answers: Answers = { a: "yes", b: "khong_biet" };
    const cond: Condition = {
      all: [
        { field: "a", op: "eq", value: "yes" },
        { field: "b", op: "eq", value: "yes" },
      ],
    };
    expect(evalCondition(cond, answers)).toBe("unknown");
  });

  // T07: all — true when all children true
  it("T07: all returns true when all children true", () => {
    const answers: Answers = { a: "yes", b: "yes" };
    const cond: Condition = {
      all: [
        { field: "a", op: "eq", value: "yes" },
        { field: "b", op: "eq", value: "yes" },
      ],
    };
    expect(evalCondition(cond, answers)).toBe(true);
  });

  // T08: any — true if any child true
  it("T08: any returns true if any child is true", () => {
    const answers: Answers = { a: "yes", b: "no" };
    const cond: Condition = {
      any: [
        { field: "a", op: "eq", value: "yes" },
        { field: "b", op: "eq", value: "yes" },
      ],
    };
    expect(evalCondition(cond, answers)).toBe(true);
  });

  // T09: any — unknown when no true but has unknown
  it("T09: any returns unknown when no true but has unknown", () => {
    const answers: Answers = { a: "khong_biet", b: "no" };
    const cond: Condition = {
      any: [
        { field: "a", op: "eq", value: "yes" },
        { field: "b", op: "eq", value: "yes" },
      ],
    };
    expect(evalCondition(cond, answers)).toBe("unknown");
  });

  // T10: not — flips true to false
  it("T10: not flips true to false", () => {
    const answers: Answers = { a: "yes" };
    const cond: Condition = { not: { field: "a", op: "eq", value: "yes" } };
    expect(evalCondition(cond, answers)).toBe(false);
  });

  // T11: not — unknown stays unknown
  it("T11: not preserves unknown", () => {
    const answers: Answers = { a: "khong_biet" };
    const cond: Condition = { not: { field: "a", op: "eq", value: "yes" } };
    expect(evalCondition(cond, answers)).toBe("unknown");
  });

  // T12: is_unknown returns true for khong_biet
  it("T12: is_unknown returns true for khong_biet", () => {
    const answers: Answers = { a: "khong_biet" };
    expect(evalCondition({ field: "a", op: "is_unknown" }, answers)).toBe(true);
  });

  // T13: is_set returns true when field has real value
  it("T13: is_set returns true when field has real value", () => {
    const answers: Answers = { a: "co" };
    expect(evalCondition({ field: "a", op: "is_set" }, answers)).toBe(true);
  });

  // T14: in — true when value in array
  it("T14: in returns true when value in list", () => {
    const answers: Answers = { type: "tnhh" };
    expect(evalCondition({ field: "type", op: "in", value: ["tnhh", "cp"] }, answers)).toBe(true);
  });

  // T15: not_in — false when value in array
  it("T15: not_in returns false when value in list", () => {
    const answers: Answers = { type: "tnhh" };
    expect(evalCondition({ field: "type", op: "not_in", value: ["tnhh", "cp"] }, answers)).toBe(false);
  });
});

// T16–T19: evaluate function
describe("evaluate", () => {
  const baseObligationRule: ObligationRule = {
    code: "TEST_OBL",
    status: "published",
    title: "Test Obligation",
    summary_plain: "Test",
    why_plain: "Because",
    applies_if: { field: "has_vat", op: "eq", value: "co" },
    schedule: {
      type: "once_fixed",
      date: "2025-01-01",
    },
    how_to_steps: [],
    penalty_plain: "",
    legal_basis: [],
    guide_slug: "test",
    severity: "high",
    effective_from: "2020-01-01",
    effective_to: null,
    version: 1,
  };

  const baseRiskRule: RiskRule = {
    code: "TEST_RISK",
    status: "published",
    level: "red",
    trigger: { field: "has_issue", op: "eq", value: "co" },
    title: "Test Risk",
    ok_title: "All good",
    explain_plain: "Explanation",
    fix_steps: [],
    legal_basis: [],
    guide_slug: "test-risk",
  };

  // T16: draft rules excluded by default
  it("T16: draft rules are excluded by default", () => {
    const draftRule: RiskRule = { ...baseRiskRule, code: "DRAFT_RISK", status: "draft" };
    const result = evaluate(
      { has_issue: "co" },
      [],
      [draftRule],
      "2025-06-01",
      [],
      { includeDraft: false }
    );
    expect(result.red).toHaveLength(0);
  });

  // T17: draft rules included when includeDraft=true
  it("T17: draft rules included when includeDraft=true", () => {
    const draftRule: RiskRule = { ...baseRiskRule, code: "DRAFT_RISK", status: "draft" };
    const result = evaluate(
      { has_issue: "co" },
      [],
      [draftRule],
      "2025-06-01",
      [],
      { includeDraft: true }
    );
    expect(result.red).toHaveLength(1);
    expect(result.red[0].isDraft).toBe(true);
  });

  // T18: risk trigger=true+red → red bucket
  it("T18: risk trigger=true+red → red bucket", () => {
    const result = evaluate({ has_issue: "co" }, [], [baseRiskRule], "2025-06-01", []);
    expect(result.red).toHaveLength(1);
    expect(result.red[0].code).toBe("TEST_RISK");
  });

  // T19: risk trigger=unknown → yellow bucket with title from rule
  it("T19: risk trigger=unknown → yellow bucket", () => {
    const result = evaluate({ has_issue: "khong_biet" }, [], [baseRiskRule], "2025-06-01", []);
    expect(result.yellow).toHaveLength(1);
    expect(result.yellow[0].title).toBe(baseRiskRule.title);
  });

  it("T20: risk trigger=false → green bucket with ok_title", () => {
    const result = evaluate({ has_issue: "khong" }, [], [baseRiskRule], "2025-06-01", []);
    expect(result.green).toHaveLength(1);
    expect(result.green[0].title).toBe(baseRiskRule.ok_title);
  });
});

// T21: getTodayInVN returns valid date string
describe("getTodayInVN", () => {
  it("T21: returns a valid YYYY-MM-DD string", () => {
    const today = getTodayInVN();
    expect(today).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

// T22-T24: applyShift
describe("applyShift", () => {
  it("T22: shift_rule=none returns date unchanged", () => {
    const result = applyShift("2025-03-31", "none", []);
    expect(result.dueDate).toBe("2025-03-31");
    expect(result.shiftedFrom).toBeUndefined();
  });

  it("T23: next_working_day shifts Saturday to Monday", () => {
    // 2025-08-30 is Saturday → should shift to 2025-09-01 (Monday)
    const result = applyShift("2025-08-30", "next_working_day", []);
    expect(result.dueDate).toBe("2025-09-01");
    expect(result.shiftedFrom).toBe("2025-08-30");
  });

  it("T24: next_working_day skips holidays", () => {
    // 2025-09-01 is Monday but it's a holiday → shift to 2025-09-02
    const result = applyShift("2025-08-30", "next_working_day", ["2025-09-01"]);
    expect(result.dueDate).toBe("2025-09-02");
    expect(result.shiftedFrom).toBe("2025-08-30");
  });
});
