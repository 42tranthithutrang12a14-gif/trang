import type { Metadata } from "next";
import { isStripeConfigured, PLANS } from "@/lib/stripe";
import { UpgradeForm } from "./UpgradeForm";

export const metadata: Metadata = {
  title: "Nâng cấp Pro — Sổ tay DN Siêu nhỏ",
  description: "Lưu không giới hạn, nhận nhắc hạn nộp qua email và nhiều tính năng khác.",
};

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

export default function NangCapPage() {
  const stripeReady = isStripeConfigured();

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">
          Gói dịch vụ
        </p>
        <h1 className="text-3xl font-bold text-foreground">
          Nâng cấp lên Pro
        </h1>
        <p className="mt-3 text-sm text-muted max-w-md mx-auto">
          Mở khoá đầy đủ tính năng và không bao giờ bỏ lỡ một hạn nộp quan trọng nào.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 mb-8">
        {/* Free plan */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-muted mb-1">{PLANS.free.name}</p>
          <p className="text-3xl font-bold text-foreground mb-4">
            0₫<span className="text-sm font-normal text-muted">/tháng</span>
          </p>
          <ul className="space-y-2">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro plan */}
        <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            Phổ biến
          </span>
          <p className="text-sm font-semibold text-accent mb-1">{PLANS.pro.name}</p>
          <p className="text-3xl font-bold text-foreground mb-4">
            {(PLANS.pro.price / 1000).toFixed(0)}k₫
            <span className="text-sm font-normal text-muted">/tháng</span>
          </p>
          <ul className="space-y-2">
            {PLANS.pro.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <CheckIcon />
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {stripeReady ? (
        <UpgradeForm />
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-8 text-center">
          <p className="text-sm font-semibold text-foreground mb-1">Tính năng đang hoàn thiện</p>
          <p className="text-xs text-muted">
            Thanh toán sẽ sớm được bật. Khám sức khỏe pháp lý vẫn hoàn toàn miễn phí.
          </p>
        </div>
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Thanh toán qua thẻ quốc tế (Stripe). Hủy bất kỳ lúc nào. Không ràng buộc.
      </p>
    </div>
  );
}
