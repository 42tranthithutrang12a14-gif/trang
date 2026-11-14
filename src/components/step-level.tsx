import type { ChecklistStep } from "@/lib/tu-0-den-1";

const LEVELS: Record<ChecklistStep["level"], { label: string; className: string }> = {
  "bat-buoc": { label: "Bắt buộc", className: "bg-danger/10 text-danger" },
  "nen-lam": { label: "Nên làm", className: "bg-accent/10 text-accent" },
  "tuy-truong-hop": { label: "Tùy trường hợp", className: "bg-border text-muted" },
};

export function StepLevel({ level }: { level: ChecklistStep["level"] }) {
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${LEVELS[level].className}`}>
      {LEVELS[level].label}
    </span>
  );
}
