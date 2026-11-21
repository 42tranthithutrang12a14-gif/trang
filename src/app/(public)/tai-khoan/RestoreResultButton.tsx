"use client";

import { useRouter } from "next/navigation";
import type { Answers } from "@/lib/engine/types";

const STORAGE_KEY = "sotay_answers_v1";

export function RestoreResultButton({ answers }: { answers: Answers }) {
  const router = useRouter();

  function handleRestore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // ignore
    }
    router.push("/ket-qua");
  }

  return (
    <button
      onClick={handleRestore}
      className="text-xs text-accent hover:underline flex-shrink-0"
    >
      Xem lại →
    </button>
  );
}
