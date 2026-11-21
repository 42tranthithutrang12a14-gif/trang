"use client";

import Link from "next/link";
import { useState } from "react";
import { DraftNotice } from "@/components/draft-notice";
import { StepLevel } from "@/components/step-level";
import { checklistStore, stageStore } from "@/lib/local-store";
import { nextStep, stepsForStage, type RoadmapStage, type Routine } from "@/lib/lo-trinh";
import type { GuideLinks } from "@/lib/thao-tac";
import { countDone, parseDone, toggleDone, type ChecklistStage, type ChecklistStep } from "@/lib/tu-0-den-1";

type Props = {
  stages: RoadmapStage[];
  checklist: ChecklistStage[];
  routines: Routine[];
  guideLinks: GuideLinks;
};

function NextStepCard({
  step,
  position,
  total,
  guide,
  onDone,
  onSkip,
}: {
  step: ChecklistStep;
  position: number;
  total: number;
  guide?: { slug: string };
  onDone: () => void;
  onSkip: () => void;
}) {
  return (
    <div className="rounded-2xl border-2 border-accent bg-surface p-5">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
        Việc tiếp theo · việc {position}/{total}
      </p>
      <DraftNotice unit={step} />
      <h2 className="text-lg font-bold leading-snug text-foreground">{step.title}</h2>
      <div className="mt-2 flex flex-wrap gap-1.5">
        <StepLevel level={step.level} />
        {step.deadline && (
          <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">Hạn: {step.deadline}</span>
        )}
      </div>

      {step.prepare.length > 0 && (
        <div className="mt-4">
          <p className="mb-1 text-xs font-semibold text-foreground">Cần chuẩn bị</p>
          <ul className="space-y-1">
            {step.prepare.map((item) => (
              <li key={item} className="flex gap-2 text-sm text-muted">
                <span>•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-4">
        <p className="mb-1 text-xs font-semibold text-foreground">Làm từng bước</p>
        <ol className="space-y-1.5">
          {step.how.map((item, i) => (
            <li key={i} className="flex gap-2 text-sm text-foreground">
              <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ol>
      </div>

      {(guide || step.links.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
          {guide && (
            <Link href={`/thao-tac/${guide.slug}`} className="text-sm font-semibold text-accent hover:underline">
              🖱️ Hướng dẫn từng cú nhấp chuột →
            </Link>
          )}
          {step.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent hover:underline">
              {link.label} ↗
            </a>
          ))}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          onClick={onDone}
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
        >
          ✓ Tôi đã làm xong
        </button>
        {total > 1 && (
          <button
            onClick={onSkip}
            className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/50 hover:text-foreground"
          >
            Để sau, xem việc khác
          </button>
        )}
      </div>
    </div>
  );
}

function RoutineList({ routines }: { routines: Routine[] }) {
  if (routines.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-base font-semibold text-foreground">Nội dung đang được kiểm duyệt</p>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {routines.map((routine) => (
        <div key={routine.id} className="rounded-xl border border-border bg-surface p-4">
          <DraftNotice unit={routine} />
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-semibold text-accent">{routine.when}</span>
            <h3 className="text-sm font-semibold text-foreground">{routine.title}</h3>
          </div>
          <ol className="mt-3 space-y-1.5">
            {routine.how.map((item, i) => (
              <li key={i} className="flex gap-2 text-sm text-foreground">
                <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ol>
          {routine.tool && (
            <Link href={routine.tool.href} className="mt-3 inline-block text-sm font-semibold text-accent hover:underline">
              {routine.tool.label} →
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export function Roadmap({ stages, checklist, routines, guideLinks }: Props) {
  const stageId = stageStore.useValue();
  const done = parseDone(checklistStore.useValue());
  const [skipped, setSkipped] = useState<string[]>([]);

  const stageIndex = stages.findIndex((stage) => stage.id === stageId);
  const stage = stages[stageIndex];
  const steps = stage ? stepsForStage(stage, checklist) : [];
  const doneCount = countDone(steps, done);
  const current = nextStep(steps, done, skipped);
  const followingStage = stages[stageIndex + 1];
  const percent = steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

  const toggle = (id: string) => checklistStore.write(JSON.stringify(toggleDone(done, id)));

  return (
    <div>
      <h2 className="mb-3 text-base font-bold text-foreground">Bạn đang ở đâu?</h2>
      <div className={stage ? "flex flex-wrap gap-2" : "grid gap-3 sm:grid-cols-3"}>
        {stages.map((option) => {
          const selected = option.id === stageId;
          return (
            <button
              key={option.id}
              onClick={() => stageStore.write(option.id)}
              aria-pressed={selected}
              className={`border-2 text-left transition-colors ${
                stage ? "flex items-center gap-2 rounded-full px-3 py-1.5" : "rounded-2xl p-4"
              } ${selected ? "border-accent bg-accent/5" : "border-border bg-surface hover:border-accent/40"}`}
            >
              <span className={stage ? "text-base" : "text-2xl"}>{option.icon}</span>
              <span className={`text-sm font-bold text-foreground ${stage ? "" : "mt-2 block"}`}>{option.title}</span>
              {!stage && <span className="mt-1 block text-xs leading-relaxed text-muted">{option.desc}</span>}
            </button>
          );
        })}
      </div>

      {!stage && (
        <p className="mt-6 rounded-xl border border-dashed border-border px-4 py-6 text-center text-sm text-muted">
          Bấm vào một ô ở trên. Sổ tay sẽ chỉ ra việc tiếp theo bạn cần làm.
        </p>
      )}

      {stage && (
        <div className="mt-8">
          <p className="text-sm font-semibold text-foreground">{stage.goal}</p>

          {stage.checklist_stages.length === 0 ? (
            <div className="mt-4">
              <p className="mb-4 text-sm text-muted">Các việc lặp lại. Làm đều là sổ sách gọn.</p>
              <RoutineList routines={routines} />
            </div>
          ) : steps.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-border bg-surface p-8 text-center">
              <p className="text-base font-semibold text-foreground">Nội dung đang được kiểm duyệt</p>
            </div>
          ) : (
            <>
              <div className="mt-3 mb-5">
                <div className="mb-1 flex items-center justify-between text-xs text-muted">
                  <span>
                    Đã xong {doneCount}/{steps.length} việc
                  </span>
                  <span>{percent}%</span>
                </div>
                <div
                  className="h-2 overflow-hidden rounded-full bg-border"
                  role="progressbar"
                  aria-label="Tiến độ giai đoạn"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percent}
                >
                  <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percent}%` }} />
                </div>
              </div>

              {current ? (
                <NextStepCard
                  step={current}
                  position={steps.indexOf(current) + 1}
                  total={steps.length}
                  guide={guideLinks[current.id]}
                  onDone={() => toggle(current.id)}
                  onSkip={() => setSkipped((ids) => (ids.includes(current.id) ? [current.id] : [...ids, current.id]))}
                />
              ) : (
                <div className="rounded-2xl border-2 border-success/40 bg-success-bg p-5">
                  <p className="text-base font-bold text-foreground">🎉 Bạn đã xong giai đoạn này</p>
                  {followingStage && (
                    <button
                      onClick={() => stageStore.write(followingStage.id)}
                      className="mt-3 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-dark"
                    >
                      Sang giai đoạn tiếp: {followingStage.title} →
                    </button>
                  )}
                </div>
              )}

              <details className="mt-5">
                <summary className="cursor-pointer text-sm font-semibold text-accent">
                  Xem tất cả {steps.length} việc của giai đoạn này
                </summary>
                <ul className="mt-3 space-y-1.5">
                  {steps.map((step) => {
                    const checked = done.includes(step.id);
                    return (
                      <li key={step.id} className="flex items-start gap-2.5 rounded-lg border border-border bg-surface px-3 py-2">
                        <input
                          id={`lo-trinh-${step.id}`}
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(step.id)}
                          className="mt-0.5 h-4 w-4 flex-shrink-0 cursor-pointer accent-accent"
                        />
                        <label
                          htmlFor={`lo-trinh-${step.id}`}
                          className={`flex-1 cursor-pointer text-sm ${checked ? "text-muted line-through" : "text-foreground"}`}
                        >
                          {step.title}
                        </label>
                        {step.id === current?.id && <span className="flex-shrink-0 text-xs font-semibold text-accent">đang làm</span>}
                      </li>
                    );
                  })}
                </ul>
                <Link href="/tu-0-den-1" className="mt-3 inline-block text-sm text-accent hover:underline">
                  Xem cách làm của từng việc →
                </Link>
              </details>
            </>
          )}
        </div>
      )}

      <div className="mt-10">
        <h2 className="mb-3 text-base font-bold text-foreground">Công cụ và hỗ trợ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { href: "/cong-cu#so-thu-chi", icon: "📒", title: "Sổ thu chi (Excel)", desc: "Tải về, ghi tiền vào, tiền ra mỗi ngày." },
            { href: "/cong-cu#thao-tac", icon: "🖱️", title: "Từng cú nhấp chuột", desc: "Thao tác trên các cổng nhà nước." },
            { href: "/can-giup", icon: "🙋", title: "Cần người giúp?", desc: "Gửi yêu cầu, chúng tôi kết nối người hỗ trợ." },
          ].map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
            >
              <span className="text-2xl">{tool.icon}</span>
              <p className="mt-2 text-sm font-semibold text-foreground">{tool.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted">{tool.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
