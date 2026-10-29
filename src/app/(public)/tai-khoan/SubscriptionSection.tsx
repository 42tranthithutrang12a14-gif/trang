"use client";

import Link from "next/link";
import type { UserPlan } from "@/lib/subscription";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function SubscriptionSection({ plan }: { plan: UserPlan | null }) {
  const isPro = plan?.plan === "pro" && plan.isActive;

  if (!isPro) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Miễn phí</p>
          <p className="text-xs text-muted mt-0.5">Lưu không giới hạn · Không có nhắc lịch email</p>
        </div>
        <Link
          href="/nang-cap"
          className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          Nâng cấp Pro →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">Gói Pro</p>
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
              Đang hoạt động
            </span>
          </div>
          {plan?.currentPeriodEnd && (
            <p className="text-xs text-muted mt-0.5">
              Hạn sử dụng: {formatDate(plan.currentPeriodEnd)}
            </p>
          )}
        </div>
        <Link
          href="/nang-cap"
          className="rounded-xl border border-border px-4 py-2 text-xs text-muted hover:border-accent hover:text-accent transition-colors"
        >
          Gia hạn
        </Link>
      </div>
    </div>
  );
}
