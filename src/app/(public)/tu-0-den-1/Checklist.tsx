"use client";

import { useSyncExternalStore } from "react";
import { DraftNotice } from "@/components/draft-notice";
import { countDone, parseDone, toggleDone, type ChecklistStage, type ChecklistStep } from "@/lib/tu-0-den-1";

const STORAGE_KEY = "sotay_tu0den1_v1";
const listeners = new Set<() => void>();
// Storage can be blocked (e.g. private mode); then ticks live in memory for this visit only.
let unsaved: string | null = null;

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  window.addEventListener("storage", onChange);
  return () => {
    listeners.delete(onChange);
    window.removeEventListener("storage", onChange);
  };
}

function readStored(): string {
  if (unsaved !== null) return unsaved;
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

function writeStored(value: string) {
  try {
    localStorage.setItem(STORAGE_KEY, value);
    unsaved = null;
  } catch {
    unsaved = value;
  }
  listeners.forEach((listener) => listener());
}

const LEVELS: Record<ChecklistStep["level"], { label: string; className: string }> = {
  "bat-buoc": { label: "Bắt buộc", className: "bg-danger/10 text-danger" },
  "nen-lam": { label: "Nên làm", className: "bg-accent/10 text-accent" },
  "tuy-truong-hop": { label: "Tùy trường hợp", className: "bg-border text-muted" },
};

function StepItem({ step, checked, onToggle }: { step: ChecklistStep; checked: boolean; onToggle: () => void }) {
  const level = LEVELS[step.level];
  const inputId = `buoc-${step.id}`;
  return (
    <li className={`rounded-xl border bg-surface p-4 transition-colors ${checked ? "border-success/40" : "border-border"}`}>
      <div className="flex items-start gap-3">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={onToggle}
          className="mt-0.5 h-5 w-5 flex-shrink-0 cursor-pointer accent-accent"
        />
        <div className="min-w-0 flex-1">
          <DraftNotice unit={step} />
          <label
            htmlFor={inputId}
            className={`block cursor-pointer text-sm font-semibold leading-snug ${checked ? "text-muted line-through" : "text-foreground"}`}
          >
            {step.title}
          </label>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${level.className}`}>{level.label}</span>
            {step.deadline && (
              <span className="rounded-full bg-warning/10 px-2 py-0.5 text-xs font-medium text-warning">
                Hạn: {step.deadline}
              </span>
            )}
          </div>
          <details className="mt-2">
            <summary className="cursor-pointer text-xs font-semibold text-accent">Xem cách làm</summary>
            <div className="mt-3 space-y-3">
              {step.prepare.length > 0 && (
                <div>
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
              <div>
                <p className="mb-1 text-xs font-semibold text-foreground">Các bước</p>
                <ol className="space-y-1.5">
                  {step.how.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm text-foreground">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted">
                        {j + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </div>
              {step.links.length > 0 && (
                <div className="flex flex-wrap gap-x-4 gap-y-1">
                  {step.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-accent hover:underline"
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
          </details>
        </div>
      </div>
    </li>
  );
}

export function Checklist({ stages }: { stages: ChecklistStage[] }) {
  const done = parseDone(useSyncExternalStore(subscribe, readStored, () => ""));
  const steps = stages.flatMap((stage) => stage.steps);
  const doneCount = countDone(steps, done);
  const percent = Math.round((doneCount / steps.length) * 100);

  function reset() {
    if (window.confirm("Bỏ hết dấu tích?")) writeStored("");
  }

  return (
    <div>
      <div className="mb-8 rounded-2xl border border-border bg-surface p-5">
        <div className="mb-2 flex items-center justify-between gap-4">
          <p className="text-sm font-semibold text-foreground">
            Đã xong {doneCount}/{steps.length} việc
          </p>
          {doneCount > 0 && (
            <button onClick={reset} className="text-xs text-muted transition-colors hover:text-danger">
              Bỏ hết dấu tích
            </button>
          )}
        </div>
        <div
          className="h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
          aria-label="Tiến độ"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
        >
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${percent}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted">Dấu tích chỉ lưu trên trình duyệt này, không gửi đi đâu.</p>
      </div>

      <div className="space-y-10">
        {stages.map((stage, i) => (
          <section key={stage.id} aria-labelledby={`giai-doan-${stage.id}`}>
            <DraftNotice unit={stage} />
            <div className="mb-1 flex items-baseline justify-between gap-3">
              <h2 id={`giai-doan-${stage.id}`} className="text-lg font-bold text-foreground">
                <span className="text-accent">Giai đoạn {i + 1}.</span> {stage.title}
              </h2>
              <span className="flex-shrink-0 text-xs font-semibold text-muted">
                {countDone(stage.steps, done)}/{stage.steps.length}
              </span>
            </div>
            <p className="mb-4 text-sm text-muted">{stage.intro}</p>
            <ul className="space-y-3">
              {stage.steps.map((step) => (
                <StepItem
                  key={step.id}
                  step={step}
                  checked={done.includes(step.id)}
                  onToggle={() => writeStored(JSON.stringify(toggleDone(done, step.id)))}
                />
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
