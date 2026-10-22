"use server";

import { createClient } from "@/lib/supabase/server";
import { isStripeConfigured, getStripe } from "@/lib/stripe";
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

export async function createCheckoutSession(
  referralCode?: string
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  if (!isStripeConfigured()) {
    return { ok: false, error: "Thanh toán chưa được bật." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Chưa đăng nhập" };

  const priceId = process.env.STRIPE_PRICE_ID;
  if (!priceId) return { ok: false, error: "Giá gói Pro chưa được cấu hình." };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";

  const stripe = getStripe();

  // Get or create Stripe customer
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  let customerId = sub?.stripe_customer_id as string | undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
  }

  // Validate and apply referral code discount
  let discounts: { coupon: string }[] = [];
  if (referralCode) {
    const { data: refCode } = await supabase
      .from("referral_codes")
      .select("discount_pct, is_active")
      .eq("code", referralCode.toUpperCase())
      .single();

    if (refCode?.is_active && refCode.discount_pct > 0) {
      // Create Stripe coupon on the fly
      const coupon = await stripe.coupons.create({
        percent_off: refCode.discount_pct,
        duration: "once",
        name: `Mã giảm giá ${referralCode.toUpperCase()}`,
      });
      discounts = [{ coupon: coupon.id }];
    }
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${appUrl}/tai-khoan?upgraded=1`,
    cancel_url: `${appUrl}/nang-cap`,
    metadata: {
      supabase_user_id: user.id,
      referral_code: referralCode ?? "",
    },
    ...(discounts.length > 0 ? { discounts } : {}),
  });

  if (!session.url) return { ok: false, error: "Không thể tạo phiên thanh toán." };
  return { ok: true, url: session.url };
}

export async function createPortalSession(): Promise<
  { ok: true; url: string } | { ok: false; error: string }
> {
  if (!isStripeConfigured()) return { ok: false, error: "Thanh toán chưa được bật." };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Chưa đăng nhập" };

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  const customerId = sub?.stripe_customer_id as string | undefined;
  if (!customerId) return { ok: false, error: "Không tìm thấy thông tin thanh toán." };

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "";
  const stripe = getStripe();
  const portal = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${appUrl}/tai-khoan`,
  });

  return { ok: true, url: portal.url };
}
