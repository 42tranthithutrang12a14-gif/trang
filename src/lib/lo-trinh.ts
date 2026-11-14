import { isVisible, type Reviewable } from "@/lib/bat-dau";
import type { ChecklistStage, ChecklistStep } from "@/lib/tu-0-den-1";

export type RoadmapStage = {
  id: string;
  icon: string;
  title: string;
  desc: string;
  goal: string;
  checklist_stages: string[];
};

export type Routine = Reviewable & {
  id: string;
  when: string;
  title: string;
  how: string[];
  tool?: { label: string; href: string };
};

export type RoadmapContent = {
  updated_at: string;
  todo_for_reviewer: string[];
  stages: RoadmapStage[];
  routines: Routine[];
};

export function visibleRoutines(content: RoadmapContent, preview: boolean): Routine[] {
  return content.routines.filter((routine) => isVisible(routine.status, preview));
}

export function stepsForStage(stage: RoadmapStage, checklist: ChecklistStage[]): ChecklistStep[] {
  return checklist.filter((part) => stage.checklist_stages.includes(part.id)).flatMap((part) => part.steps);
}

// Skipped steps come back once every other open step is done or skipped too.
export function nextStep(steps: ChecklistStep[], done: string[], skipped: string[]): ChecklistStep | undefined {
  const open = steps.filter((step) => !done.includes(step.id));
  return open.find((step) => !skipped.includes(step.id)) ?? open[0];
}
