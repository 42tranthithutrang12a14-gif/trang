"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import questions from "@/content/questions.json";
import { evalCondition } from "@/lib/engine/conditions";
import type { Answers, Condition } from "@/lib/engine/types";

const STORAGE_KEY = "sotay_answers_v1";
const PROGRESS_KEY = "sotay_progress_v1";

type Question = (typeof questions)[number];

const CONTENT_PREVIEW = process.env.NEXT_PUBLIC_CONTENT_PREVIEW === "true";

function isVisible(q: Question, answers: Answers): boolean {
  if (!("show_if" in q) || !q.show_if) return true;
  const result = evalCondition(q.show_if as Condition, answers);
  return result === true;
}

const mainQuestions = questions.filter((q) => !q.is_conditional);

export default function KhamPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({});
  const [currentId, setCurrentId] = useState<string>(questions[0].id);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedProgress = localStorage.getItem(PROGRESS_KEY);
      if (saved) setAnswers(JSON.parse(saved) as Answers);
      if (savedProgress) setCurrentId(savedProgress);
    } catch {
      // localStorage unavailable
    }
    setLoaded(true);
  }, []);

  const saveToStorage = useCallback((ans: Answers, qId: string) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ans));
      localStorage.setItem(PROGRESS_KEY, qId);
    } catch {
      // ignore
    }
  }, []);

  const visibleQuestions = questions.filter((q) => isVisible(q, answers));

  const currentIndex = visibleQuestions.findIndex((q) => q.id === currentId);
  const currentQuestion = visibleQuestions[currentIndex] ?? visibleQuestions[0];

  // Progress: position among main questions
  const mainIndex = mainQuestions.findIndex((q) => q.id === currentQuestion.id);
  const displayNumber = mainIndex >= 0 ? mainIndex + 1 : mainQuestions.length;

  const isLast = currentIndex === visibleQuestions.length - 1;
  const isFirst = currentIndex === 0;

  function handleAnswer(value: string) {
    const newAnswers = { ...answers, [currentQuestion.id]: value };

    // Clear conditional answers when parent condition no longer holds
    for (const q of questions) {
      if (q.is_conditional && q.id in newAnswers) {
        if (!isVisible(q as Question, newAnswers)) {
          delete newAnswers[q.id];
        }
      }
    }

    setAnswers(newAnswers);

    if (isLast) {
      saveToStorage(newAnswers, currentQuestion.id);
      router.push("/ket-qua");
      return;
    }

    // Find next visible question after current
    const nextVisible = questions
      .filter((q) => isVisible(q as Question, newAnswers))
      .find((_, idx, arr) => {
        const curIdx = arr.findIndex((q) => q.id === currentQuestion.id);
        return idx > curIdx;
      });

    const nextId = nextVisible?.id ?? currentQuestion.id;
    saveToStorage(newAnswers, nextId);
    setCurrentId(nextId);
  }

  function handleBack() {
    if (isFirst) return;
    const prevQuestion = visibleQuestions[currentIndex - 1];
    setCurrentId(prevQuestion.id);
    saveToStorage(answers, prevQuestion.id);
  }

  function handleKeyDown(e: React.KeyboardEvent, options: { label: string; value: string }[]) {
    const num = parseInt(e.key);
    if (num >= 1 && num <= options.length) {
      handleAnswer(options[num - 1].value);
    }
    if (e.key === "Enter") {
      const currentVal = answers[currentQuestion.id];
      if (currentVal) handleAnswer(currentVal);
    }
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted">Đang tải...</p>
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id];
  const options =
    currentQuestion.type === "single"
      ? [
          ...currentQuestion.options,
          { label: "Không biết", value: "khong_biet" },
        ]
      : currentQuestion.options;

  const progressPct = Math.round((displayNumber / mainQuestions.length) * 100);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      {CONTENT_PREVIEW && (
        <div className="mb-6 rounded-lg border-2 border-red-500 bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700">
          Nội dung mẫu chưa xác minh — chỉ dùng để thử nghiệm
        </div>
      )}

      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-muted mb-2">
          <span>
            Câu {displayNumber}/{mainQuestions.length}
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-border overflow-hidden mb-4">
          <div
            className="h-full rounded-full bg-accent transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        {/* Question number navigation */}
        <div className="flex flex-wrap gap-1.5">
          {mainQuestions.map((q, idx) => {
            const num = idx + 1;
            const isCurrent = q.id === currentQuestion.id;
            const isAnswered = q.id in answers;
            const isReachable = isAnswered || num <= displayNumber + 1;
            return (
              <button
                key={q.id}
                disabled={!isReachable}
                onClick={() => {
                  if (!isReachable) return;
                  setCurrentId(q.id);
                  saveToStorage(answers, q.id);
                }}
                className={[
                  "flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all",
                  isCurrent
                    ? "bg-accent text-white ring-2 ring-accent ring-offset-1"
                    : isAnswered
                    ? "bg-accent/20 text-accent hover:bg-accent/30 cursor-pointer"
                    : isReachable
                    ? "bg-border text-muted hover:bg-border/70 cursor-pointer"
                    : "bg-border/40 text-muted/40 cursor-not-allowed",
                ].join(" ")}
                title={q.text}
              >
                {num}
              </button>
            );
          })}
        </div>
      </div>

      {/* Group label */}
      <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
        {currentQuestion.group_label}
      </p>

      {/* Question card */}
      <div
        className="rounded-2xl border border-border bg-surface p-6 shadow-sm"
        onKeyDown={(e) =>
          currentQuestion.type === "single"
            ? handleKeyDown(e, options as { label: string; value: string }[])
            : undefined
        }
        tabIndex={-1}
      >
        <h2 className="text-xl font-semibold text-foreground leading-snug">
          {currentQuestion.text}
        </h2>

        {currentQuestion.help_text && (
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {currentQuestion.help_text}
          </p>
        )}

        {/* Single choice */}
        {currentQuestion.type === "single" && (
          <div className="mt-6 space-y-3">
            {options.map((opt, idx) => {
              const isSelected = currentAnswer === opt.value;
              const isUnknown = opt.value === "khong_biet";
              return (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className={[
                    "flex w-full items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all",
                    isSelected
                      ? "border-accent bg-accent/5 text-accent"
                      : isUnknown
                      ? "border-border bg-surface text-muted hover:border-muted hover:text-foreground"
                      : "border-border bg-surface text-foreground hover:border-accent/50 hover:bg-accent/5",
                  ].join(" ")}
                >
                  <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border-2 border-current text-xs font-bold">
                    {idx + 1}
                  </span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        )}

        {/* Date input */}
        {currentQuestion.type === "date" && (
          <div className="mt-6">
            <input
              type="month"
              value={
                currentAnswer
                  ? currentAnswer.slice(0, 7)
                  : ""
              }
              onChange={(e) => {
                const val = e.target.value ? e.target.value + "-01" : "";
                if (val) handleAnswer(val);
              }}
              className="w-full rounded-xl border-2 border-border bg-surface px-4 py-3 text-base text-foreground focus:border-accent focus:outline-none"
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  if (currentAnswer) handleAnswer(currentAnswer);
                }}
                disabled={!currentAnswer}
                className="rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white disabled:opacity-40 hover:bg-accent-dark transition-colors"
              >
                Tiếp theo →
              </button>
              <button
                onClick={() => handleAnswer("khong_biet")}
                className="rounded-xl border-2 border-border px-6 py-3 text-sm font-medium text-muted hover:border-muted hover:text-foreground transition-colors"
              >
                Không biết
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={handleBack}
          disabled={isFirst}
          className="rounded-lg px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-30"
        >
          ← Quay lại
        </button>
        <p className="text-xs text-muted">
          Bàn phím: nhấn số 1–{options.length} để chọn
        </p>
      </div>
    </div>
  );
}
