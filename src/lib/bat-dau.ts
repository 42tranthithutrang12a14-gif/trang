import type { LegalBasis, ObligationRule } from "@/lib/engine/types";

export type ContentStatus = ObligationRule["status"];

export type Reviewable = {
  status: ContentStatus;
  sample_notice?: string;
  legal_basis: LegalBasis[];
  todo_for_reviewer: string[];
};

export type Section<T extends Reviewable> = Reviewable & {
  title: string;
  intro: string;
  items: T[];
};

export type Pillar = Reviewable & {
  id: string;
  icon: string;
  tone: "accent" | "warning" | "success";
  title: string;
  desc: string;
  examples: string[];
};

export type YearOneStep = Reviewable & {
  id: string;
  timing: string;
  urgency: "hot" | "deadline" | "normal";
  title: string;
  tasks: { text: string; note: string }[];
};

export type AnnualRow = Reviewable & {
  id: string;
  month: string;
  entries: { text: string; deadline: string; type: "tax" | "accounting" | "hr" }[];
};

export type Principle = Reviewable & {
  label: string;
  lead: string;
  body: string;
};

export type Mistake = Reviewable & {
  id: string;
  icon: string;
  title: string;
  consequence: string;
  fix: string;
};

export type VisibleBatDau = {
  pillars: Section<Pillar> | null;
  year_one: Section<YearOneStep> | null;
  annual: Section<AnnualRow> | null;
  principle: Principle | null;
  mistakes: Section<Mistake> | null;
};

export type BatDauContent = {
  [K in keyof VisibleBatDau]: NonNullable<VisibleBatDau[K]>;
} & {
  updated_at: string;
  todo_for_reviewer: string[];
};

export function isVisible(status: ContentStatus, preview: boolean): boolean {
  if (status === "published") return true;
  if (status === "archived") return false;
  return preview;
}

// A section's own title/intro is reviewed content too, so it needs its own status as well as a visible item.
function filterSection<T extends Reviewable>(section: Section<T>, preview: boolean): Section<T> | null {
  if (!isVisible(section.status, preview)) return null;
  const items = section.items.filter((item) => isVisible(item.status, preview));
  return items.length > 0 ? { ...section, items } : null;
}

export function filterBatDau(content: BatDauContent, preview: boolean): VisibleBatDau {
  return {
    pillars: filterSection(content.pillars, preview),
    year_one: filterSection(content.year_one, preview),
    annual: filterSection(content.annual, preview),
    principle: isVisible(content.principle.status, preview) ? content.principle : null,
    mistakes: filterSection(content.mistakes, preview),
  };
}

export function flattenUnits(content: VisibleBatDau): Reviewable[] {
  const sections = [content.pillars, content.year_one, content.annual, content.mistakes];
  const units: Reviewable[] = [];
  for (const section of sections) {
    if (section) units.push(section, ...section.items);
  }
  if (content.principle) units.push(content.principle);
  return units;
}
