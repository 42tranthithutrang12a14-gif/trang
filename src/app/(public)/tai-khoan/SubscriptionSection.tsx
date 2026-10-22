"use client";

import Link from "next/link";
import { useState } from "react";
import { createPortalSession } from "@/app/actions/subscription";
import type { UserPlan } from "@/lib/subscription";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export function SubscriptionSection({ plan }: { plan: UserPlan | null }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isPro = plan?.plan === "pro" && plan.isActive;

  async function handleManage() {
    setLoading(true);
    setError("");
    const result = await createPortalSession();
    setLoading(false);
    if (result.ok) window.location.href = result.url;
    else setError(result.error);
  }

  if (!isPro) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-foreground">Miễn phí</p>
          <p className="text-xs text-muted mt-0.5">3 lần lưu · Không có nhắc lịch</p>
        </div>
        <Link
          href="/nang-cap"
          className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-accent-dark transition-colors"
        >
          Nâng cấp →
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium text-foreground">Gói Pro</p>
            <span className="rounded-full bg-success/10 px-2 py-0.5 text-xs font-semibold text-success">
              Đang hoạt động
            </span>
          </div>
          {plan.currentPeriodEnd && (
            <p className="text-xs text-muted mt-0.5">
              {plan.cancelAtPeriodEnd
                ? `Hủy vào ${formatDate(plan.currentPeriodEnd)}`
                : `Gia hạn ${formatDate(plan.currentPeriodEnd)}`}
            </p>
          )}
        </div>
        <button
          onClick={handleManage}
          disabled={loading}
          className="rounded-xl border border-border px-4 py-2 text-xs text-muted hover:border-accent hover:text-accent disabled:opacity-50 transition-colors"
        >
          {loading ? "..." : "Quản lý"}
        </button>
      </div>
      {error && <p className="text-xs text-danger">{error}</p>}
    </div>
  );
}
