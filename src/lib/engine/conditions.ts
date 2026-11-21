import type { Answers, Condition, TriValue } from "./types";

const UNKNOWN_VALUE = "khong_biet";

function isUnknownValue(v: string | undefined): boolean {
  return v === undefined || v === "" || v === UNKNOWN_VALUE;
}

export function evalCondition(condition: Condition, answers: Answers): TriValue {
  if ("all" in condition) {
    let hasUnknown = false;
    for (const c of condition.all) {
      const r = evalCondition(c, answers);
      if (r === false) return false;
      if (r === "unknown") hasUnknown = true;
    }
    return hasUnknown ? "unknown" : true;
  }

  if ("any" in condition) {
    let hasUnknown = false;
    for (const c of condition.any) {
      const r = evalCondition(c, answers);
      if (r === true) return true;
      if (r === "unknown") hasUnknown = true;
    }
    return hasUnknown ? "unknown" : false;
  }

  if ("not" in condition) {
    const r = evalCondition(condition.not, answers);
    if (r === "unknown") return "unknown";
    return !r;
  }

  const { field, op } = condition;
  const val = answers[field];

  if (op === "is_unknown") {
    return isUnknownValue(val);
  }

  if (op === "is_set") {
    return !isUnknownValue(val);
  }

  if (isUnknownValue(val)) {
    return "unknown";
  }

  if (op === "eq") {
    return val === (condition as { field: string; op: "eq"; value: string }).value;
  }

  if (op === "neq") {
    return val !== (condition as { field: string; op: "neq"; value: string }).value;
  }

  if (op === "in") {
    const values = (condition as { field: string; op: "in"; value: string[] }).value;
    return values.includes(val);
  }

  if (op === "not_in") {
    const values = (condition as { field: string; op: "not_in"; value: string[] }).value;
    return !values.includes(val);
  }

  if (op === "date_before") {
    const refDate = (condition as { field: string; op: "date_before"; value: string }).value;
    return val < refDate;
  }

  if (op === "date_after") {
    const refDate = (condition as { field: string; op: "date_after"; value: string }).value;
    return val > refDate;
  }

  if (op === "within_days_after") {
    const c = condition as { field: string; op: "within_days_after"; value: string; days: number };
    const eventDate = val;
    const deadline = addDays(eventDate, c.days);
    return c.value <= deadline;
  }

  return "unknown";
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}
