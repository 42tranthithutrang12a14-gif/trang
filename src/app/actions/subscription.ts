"use server";

import { createClient } from "@/lib/supabase/server";
import { getProPriceVND, getVietQRUrl, getBankInfo, isPaymentConfigured } from "@/lib/plans";
import type { UserPlan } from "@/lib/subscription";

export async function getUserPlan(): Promise<UserPlan | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("subscriptions")
    .select("plan, status, current_period_end, cancel_at_period_end")
    .eq("user_id", user.id)
    .single();

  if (!data) return { plan: "free", isActive: true, currentPeriodEnd: null, cancelAtPeriodEnd: false };

  const isActive = data.status === "active" || data.status === "trialing";
  return {
    plan: data.plan as "free" | "pro",
    isActive,
    currentPeriodEnd: data.current_period_end as string | null,
    cancelAtPeriodEnd: data.cancel_at_period_end as boolean,
  };
}

export type PaymentInfo = {
  amount: number;
  transferNote: string;
  qrUrl: string | null;
  bankId: string;
  accountNo: string;
  accountName: string;
  configured: boolean;
};

export async function getPaymentInfo(): Promise<PaymentInfo | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const amount = getProPriceVND();
  const shortId = user.id.replace(/-/g, "").slice(0, 8).toUpperCase();
  const transferNote = `SOTAY ${shortId}`;
  const bank = getBankInfo();
  const configured = isPaymentConfigured();

  return {
    amount,
    transferNote,
    qrUrl: configured ? getVietQRUrl(amount, transferNote) : null,
    bankId: bank.bankId,
    accountNo: bank.accountNo,
    accountName: bank.accountName,
    configured,
  };
}

export async function createPaymentRequest(): Promise<
  { ok: true; message: string } | { ok: false; error: string }
> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Chưa đăng nhập." };

  // Check no pending request
  const { data: existing } = await supabase
    .from("payment_requests")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "pending")
    .maybeSingle();

  if (existing) {
    return { ok: false, error: "Bạn đã có yêu cầu đang chờ xác nhận. Vui lòng đợi admin duyệt." };
  }

  const amount = getProPriceVND();
  const shortId = user.id.replace(/-/g, "").slice(0, 8).toUpperCase();
  const transferNote = `SOTAY ${shortId}`;

  const { error } = await supabase
    .from("payment_requests")
    .insert({ user_id: user.id, amount, transfer_note: transferNote });

  if (error) return { ok: false, error: "Không thể ghi nhận. Vui lòng thử lại." };

  return {
    ok: true,
    message: "Đã ghi nhận! Admin sẽ xác nhận trong 1–2 ngày làm việc. Bạn sẽ nhận email thông báo.",
  };
}
