import type { Reviewable } from "@/lib/bat-dau";

export function DraftNotice({ unit }: { unit: Reviewable }) {
  if (unit.status === "published" || !unit.sample_notice) return null;
  return (
    <span className="mb-2 inline-block rounded-full bg-warning/10 px-2 py-0.5 text-xs font-semibold text-warning">
      {unit.sample_notice}
    </span>
  );
}
