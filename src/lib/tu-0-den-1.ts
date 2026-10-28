import { isVisible, type Reviewable } from "@/lib/bat-dau";

export type PortalLink = { label: string; url: string };

export type ChecklistStep = Reviewable & {
  id: string;
  level: "bat-buoc" | "nen-lam" | "tuy-truong-hop";
  title: string;
  deadline?: string;
  prepare: string[];
  how: string[];
  links: PortalLink[];
};

export type ChecklistStage = Reviewable & {
  id: string;
  title: string;
  intro: string;
  steps: ChecklistStep[];
};

export type Incentive = Reviewable & {
  id: string;
  level: "phai-biet" | "nen-biet";
  title: string;
  who: string;
  benefit: string;
  how: string[];
  links: PortalLink[];
};

export type IncentiveSection = Reviewable & {
  title: string;
  intro: string;
  items: Incentive[];
};

export type Tu0Den1Content = {
  updated_at: string;
  todo_for_reviewer: string[];
  stages: ChecklistStage[];
  incentives: IncentiveSection;
};

// A group's own title/intro is reviewed content too, so it must be visible as well as its children.
function visibleChildren<T extends Reviewable>(parent: Reviewable, children: T[], preview: boolean): T[] {
  return isVisible(parent.status, preview) ? children.filter((child) => isVisible(child.status, preview)) : [];
}

export function filterStages(stages: ChecklistStage[], preview: boolean): ChecklistStage[] {
  return stages.flatMap((stage) => {
    const steps = visibleChildren(stage, stage.steps, preview);
    return steps.length > 0 ? [{ ...stage, steps }] : [];
  });
}

export function filterIncentives(section: IncentiveSection, preview: boolean): IncentiveSection | null {
  const items = visibleChildren(section, section.items, preview);
  return items.length > 0 ? { ...section, items } : null;
}

export function parseDone(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function toggleDone(done: string[], id: string): string[] {
  return done.includes(id) ? done.filter((d) => d !== id) : [...done, id];
}

export function countDone(steps: ChecklistStep[], done: string[]): number {
  return steps.filter((step) => done.includes(step.id)).length;
}
