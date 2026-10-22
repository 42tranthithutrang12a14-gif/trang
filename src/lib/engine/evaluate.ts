import { evalCondition } from "./conditions";
import { generateInstances } from "./schedule";
import type {
  Answers,
  ObligationRule,
  RiskRule,
  ObligationInstance,
  EngineResult,
  ResultItem,
} from "./types";

export type EvaluateOptions = {
  /** When true, include draft/non-published rules. Defaults to false. */
  includeDraft?: boolean;
};

export function evaluate(
  answers: Answers,
  obligationRules: ObligationRule[],
  riskRules: RiskRule[],
  today: string,
  holidays: string[],
  options: EvaluateOptions = {}
): EngineResult {
  const { includeDraft = false } = options;

  const red: ResultItem[] = [];
  const yellow: ResultItem[] = [];
  const green: ResultItem[] = [];
  const obligations: ObligationInstance[] = [];

  // Evaluate risk rules
  for (const rule of riskRules) {
    const isPublished = rule.status === "published";
    const isDraft = rule.status === "draft";

    if (!isPublished && !(includeDraft && isDraft)) continue;

    const result = evalCondition(rule.trigger, answers);
    const item: ResultItem = {
      type: "risk",
      code: rule.code,
      title: result === false ? rule.ok_title : rule.title,
      explain: rule.explain_plain,
      guideSlug: rule.guide_slug,
      isDraft,
    };

    if (result === true) {
      if (rule.level === "red") {
        red.push(item);
      } else {
        yellow.push(item);
      }
    } else if (result === "unknown") {
      yellow.push({ ...item, title: rule.title });
    } else {
      green.push(item);
    }
  }

  // Evaluate obligation rules
  for (const rule of obligationRules) {
    const isPublished = rule.status === "published";
    const isDraft = rule.status === "draft";

    if (!isPublished && !(includeDraft && isDraft)) continue;

    const result = evalCondition(rule.applies_if, answers);

    if (result === false) continue;

    const instances = generateInstances(
      rule.code,
      rule.version,
      rule.schedule,
      answers,
      today,
      holidays
    );
    obligations.push(...instances);

    if (result === "unknown") {
      yellow.push({
        type: "obligation",
        code: rule.code,
        title: rule.title,
        explain: rule.summary_plain,
        guideSlug: rule.guide_slug,
        isDraft,
      });
    }
  }

  return { red, yellow, green, obligations };
}
