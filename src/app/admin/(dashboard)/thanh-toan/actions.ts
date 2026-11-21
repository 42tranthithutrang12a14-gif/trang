"use server";

import { createClient as createServiceClient } from "@supabase/supabase-js";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";

function getServiceSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role not configured");
  return createServiceClient(url, key);
}

export async function approvePayment(
  requestId: string,
  adminNote: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();

  // Get the payment request to find user_id
  const { data: req } = await supabase
    .from("payment_requests")
    .select("user_id, amount")
    .eq("id", requestId)
    .single();

  if (!req) return { ok: false, error: "Không tìm thấy yêu cầu" };

  // Mark request as approved
  const { error: updateError } = await supabase
    .from("payment_requests")
    .update({
      status: "approved",
      admin_note: adminNote || null,
      reviewed_by: process.env.ADMIN_USERNAME ?? "admin",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (updateError) return { ok: false, error: updateError.message };

  // Upsert subscription: plan = pro, 1 year from now
  const periodEnd = new Date();
  periodEnd.setFullYear(periodEnd.getFullYear() + 1);

  const { error: subError } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: req.user_id,
        plan: "pro",
        status: "active",
        current_period_end: periodEnd.toISOString(),
        cancel_at_period_end: false,
      },
      { onConflict: "user_id" }
    );

  if (subError) return { ok: false, error: subError.message };

  revalidatePath("/admin/thanh-toan");
  return { ok: true };
}

export async function rejectPayment(
  requestId: string,
  adminNote: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();

  const { error } = await supabase
    .from("payment_requests")
    .update({
      status: "rejected",
      admin_note: adminNote || null,
      reviewed_by: process.env.ADMIN_USERNAME ?? "admin",
      reviewed_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/thanh-toan");
  return { ok: true };
}
