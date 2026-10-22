"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { getSession } from "@/lib/auth";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createServiceClient(url, key);
}

export async function addReferralCode(
  code: string,
  partnerName: string,
  partnerEmail: string,
  discountPct: number
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  if (!/^[A-Z0-9]{3,20}$/.test(code)) {
    return { ok: false, error: "Mã chỉ gồm chữ hoa và số, 3–20 ký tự." };
  }

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("referral_codes").insert({
    code,
    partner_name: partnerName,
    partner_email: partnerEmail,
    discount_pct: discountPct,
    is_active: true,
  });

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}

export async function toggleReferralCode(
  code: string,
  isActive: boolean
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("referral_codes")
    .update({ is_active: isActive })
    .eq("code", code);

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
