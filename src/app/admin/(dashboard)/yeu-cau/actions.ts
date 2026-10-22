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

export async function assignHelpRequest(
  requestId: string,
  partnerId: string,
  commissionNote: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("help_requests")
    .update({
      status: "assigned",
      partner_id: partnerId || null,
      commission_note: commissionNote || null,
      assigned_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/yeu-cau");
  return { ok: true };
}

export async function completeHelpRequest(
  requestId: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("help_requests")
    .update({
      status: "completed",
      completed_at: new Date().toISOString(),
    })
    .eq("id", requestId);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/yeu-cau");
  return { ok: true };
}
