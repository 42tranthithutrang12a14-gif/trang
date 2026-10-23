export type TriValue = true | false | "unknown";

export type Answers = Record<string, string>;

export type CompareOp = "eq" | "neq" | "in" | "not_in";
export type DateOp = "date_before" | "date_after" | "within_days_after";
export type MetaOp = "is_unknown" | "is_set";

export type SimpleCondition =
  | { field: string; op: CompareOp; value: string }
  | { field: string; op: "in" | "not_in"; value: string[] }
  | { field: string; op: DateOp; value: string; days?: number }
  | { field: string; op: MetaOp };

export type Condition =
  | { all: Condition[] }
  | { any: Condition[] }
  | { not: Condition }
  | SimpleCondition;

export type ShiftRule = "none" | "next_working_day";
export type FirstPeriod = "containing_founding" | "after_founding";

export type ScheduleMonthly = {
  type: "monthly";
  offset_months: number;
  due_day: number | "last";
  shift_rule: ShiftRule;
  first_period: FirstPeriod;
};

export type ScheduleQuarterly = {
  type: "quarterly";
  offset_months: number;
  due_day: number | "last";
  shift_rule: ShiftRule;
  first_period: FirstPeriod;
};

export type ScheduleYearly = {
  type: "yearly";
  offset_months: number;
  due_day: number | "last";
  shift_rule: ShiftRule;
  first_period: FirstPeriod;
};

export type ScheduleOnceAfterEvent = {
  type: "once_after_event";
  event_field: string;
  days: number;
  shift_rule: ShiftRule;
};

export type ScheduleOnceFixed = {
  type: "once_fixed";
  date: string;
};

export type Schedule =
  | ScheduleMonthly
  | ScheduleQuarterly
  | ScheduleYearly
  | ScheduleOnceAfterEvent
  | ScheduleOnceFixed;

export type LegalBasis = {
  doc_type: string;
  doc_number: string;
  title: string;
  issuer: string;
  issued_date: string;
  effective_date: string;
  article: string;
  url: string;
  verified_against_original: boolean;
  checked_at: string;
  snapshot_path: string;
};

export type ObligationRule = {
  code: string;
  status: "draft" | "in_review" | "reviewed" | "published" | "archived";
  sample_notice?: string;
  title: string;
  summary_plain: string;
  why_plain: string;
  applies_if: Condition;
  schedule: Schedule;
  how_to_steps: string[];
  penalty_plain: string;
  legal_basis: LegalBasis[];
  guide_slug: string;
  severity: "high" | "medium" | "low";
  effective_from: string;
  effective_to: string | null;
  version: number;
  todo_for_reviewer?: string[];
};

export type RiskRule = {
  code: string;
  status: "draft" | "in_review" | "reviewed" | "published" | "archived";
  sample_notice?: string;
  level: "red" | "yellow";
  trigger: Condition;
  title: string;
  ok_title: string;
  explain_plain: string;
  fix_steps: string[];
  legal_basis: LegalBasis[];
  guide_slug: string;
  todo_for_reviewer?: string[];
};

export type ObligationInstance = {
  ruleCode: string;
  ruleVersion: number;
  periodLabel: string;
  periodStart: string;
  periodEnd: string;
  dueDate: string;
  shiftedFrom?: string;
};

export type LegalRef = {
  label: string;
  article: string;
  url: string;
};

export type ResultItem = {
  type: "risk" | "obligation";
  code: string;
  title: string;
  explain: string;
  guideSlug: string;
  isDraft: boolean;
  dueDate?: string;
  legalRefs: LegalRef[];
};

export type EngineResult = {
  red: ResultItem[];
  yellow: ResultItem[];
  green: ResultItem[];
  obligations: ObligationInstance[];
};
