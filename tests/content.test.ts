import { describe, it, expect } from "vitest";
import { isOfficialSourceUrl } from "@/lib/content/validate-source";
import { generateRefCode } from "@/lib/ref-code";
import questions from "@/content/questions.json";
import obligationRules from "@/content/rules/obligation_rules.json";
import riskRules from "@/content/rules/risk_rules.json";

// T25: isOfficialSourceUrl
describe("isOfficialSourceUrl", () => {
  it("T25: accepts exact official domain", () => {
    expect(isOfficialSourceUrl("https://vbpl.vn/pages/portal.aspx")).toBe(true);
  });

  it("T26: accepts subdomain when allow_subdomains=true", () => {
    expect(isOfficialSourceUrl("https://tncn.gdt.gov.vn/")).toBe(true);
  });

  it("T27: rejects http (not https)", () => {
    expect(isOfficialSourceUrl("http://vbpl.vn/pages/portal.aspx")).toBe(false);
  });

  it("T28: rejects unknown domain", () => {
    expect(isOfficialSourceUrl("https://example.com/law")).toBe(false);
  });

  it("T29: rejects subdomain when allow_subdomains=false", () => {
    // vbpl.vn does not have allow_subdomains=true
    expect(isOfficialSourceUrl("https://sub.vbpl.vn/page")).toBe(false);
  });
});

// T30: generateRefCode format
describe("generateRefCode", () => {
  it("T30: starts with STDN", () => {
    expect(generateRefCode()).toMatch(/^STDN/);
  });

  it("T31: total length is 8 characters", () => {
    expect(generateRefCode()).toHaveLength(8);
  });

  it("T32: only uses allowed charset (no I, O, 0, 1)", () => {
    for (let i = 0; i < 100; i++) {
      const code = generateRefCode();
      const suffix = code.slice(4);
      expect(suffix).not.toMatch(/[IO01]/);
    }
  });
});

// T33: questions.json structure
describe("questions.json", () => {
  it("T33: has at least 23 main questions", () => {
    const mainQuestions = questions.filter((q) => !q.is_conditional);
    expect(mainQuestions.length).toBeGreaterThanOrEqual(23);
  });

  it("T34: all questions have required fields", () => {
    for (const q of questions) {
      expect(q).toHaveProperty("id");
      expect(q).toHaveProperty("text");
      expect(q).toHaveProperty("type");
      expect(["single", "date"]).toContain(q.type);
    }
  });

  it("T35: single questions have non-empty options array", () => {
    for (const q of questions) {
      if (q.type === "single") {
        expect(q.options.length).toBeGreaterThan(0);
      }
    }
  });
});

// T36: draft rules have sample_notice
describe("draft rules", () => {
  it("T36: all draft obligation rules have sample_notice", () => {
    for (const rule of obligationRules) {
      if (rule.status === "draft") {
        expect(rule).toHaveProperty("sample_notice");
        expect((rule as { sample_notice?: string }).sample_notice).toContain("MẪU");
      }
    }
  });

  it("T37: all draft risk rules have sample_notice", () => {
    for (const rule of riskRules) {
      if (rule.status === "draft") {
        expect(rule).toHaveProperty("sample_notice");
        expect((rule as { sample_notice?: string }).sample_notice).toContain("MẪU");
      }
    }
  });
});
