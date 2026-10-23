import type { Metadata } from "next";
import { PLANS, getProPriceVND, isPaymentConfigured, getVietQRUrl, getBankInfo } from "@/lib/plans";
import { getUserPlan } from "@/app/actions/subscription";
import { isPro } from "@/lib/subscription";
import { isSupabaseConfigured } from "@/lib/supabase/check";
import { PaymentForm } from "./PaymentForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nâng cấp Pro — Sổ tay DN Siêu nhỏ",
  description: "Nhận nhắc hạn nộp qua email tự động. 990.000 đ/năm.",
};

function CheckIcon() {
  return (
    <svg className="h-4 w-4 text-success flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function formatVND(amount: number): string {
  return amount.toLocaleString("vi-VN") + " ₫";
}

export default async function NangCapPage() {
  const amount = getProPriceVND();
  const configured = isPaymentConfigured();
  const bank = getBankInfo();

  let userPlan = null;
  let alreadyPro = false;
  if (isSupabaseConfigured()) {
    userPlan = await getUserPlan();
    alreadyPro = isPro(userPlan);
  }

  // Generate a placeholder transfer note shown server-side (will be per-user in PaymentForm)
  const qrUrl = configured
    ? getVietQRUrl(amount, "SOTAY XXXXXXXX")
    : null;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Gói dịch vụ</p>
        <h1 className="text-3xl font-bold text-foreground">Nâng cấp lên Pro</h1>
        <p className="mt-3 text-sm text-muted max-w-md mx-auto">
          Mở khoá nhắc hạn nộp tự động qua email — không bao giờ bỏ lỡ một deadline quan trọng.
        </p>
      </div>

      {/* Plan comparison */}
      <div className="grid gap-4 sm:grid-cols-2 mb-10">
        {/* Free */}
        <div className="rounded-2xl border border-border bg-surface p-6">
          <p className="text-sm font-semibold text-muted mb-1">{PLANS.free.name}</p>
          <p className="text-3xl font-bold text-foreground mb-4">
            0₫<span className="text-sm font-normal text-muted">/năm</span>
          </p>
          <ul className="space-y-2">
            {PLANS.free.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-muted">
                <CheckIcon />{f}
              </li>
            ))}
          </ul>
        </div>

        {/* Pro */}
        <div className="rounded-2xl border-2 border-accent bg-accent/5 p-6 relative">
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">
            Phổ biến
          </span>
          <p className="text-sm font-semibold text-accent mb-1">{PLANS.pro.name}</p>
          <p className="text-3xl font-bold text-foreground mb-4">
            {formatVND(amount)}<span className="text-sm font-normal text-muted">/năm</span>
          </p>
          <ul className="space-y-2">
            {PLANS.pro.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                <CheckIcon />{f}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Payment section */}
      {alreadyPro ? (
        <div className="rounded-2xl border-2 border-success/40 bg-success-bg p-6 text-center">
          <p className="text-base font-semibold text-foreground mb-1">✅ Tài khoản đang là Pro</p>
          <p className="text-sm text-muted mb-4">
            {userPlan?.currentPeriodEnd
              ? `Hạn sử dụng: ${new Date(userPlan.currentPeriodEnd).toLocaleDateString("vi-VN")}`
              : "Đang hoạt động"}
          </p>
          <Link href="/tai-khoan" className="text-sm text-accent hover:underline">
            Xem tài khoản →
          </Link>
        </div>
      ) : (
        <PaymentForm
          amount={amount}
          bank={bank}
          qrBaseUrl={qrUrl}
          configured={configured}
        />
      )}

      <p className="mt-6 text-center text-xs text-muted">
        Thanh toán qua chuyển khoản ngân hàng nội địa. Admin xác nhận trong 1–2 ngày làm việc.
      </p>
    </div>
  );
}
