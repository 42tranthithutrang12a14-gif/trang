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

export async function addPartner(
  name: string,
  email: string,
  phone: string,
  notes: string
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  if (!name.trim()) return { ok: false, error: "Tên đối tác không được để trống." };

  const supabase = getServiceSupabase();
  const { error } = await supabase.from("partners").insert({
    name: name.trim(),
    email: email.trim() || null,
    phone: phone.trim() || null,
    notes: notes.trim() || null,
    is_active: true,
  });

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/doi-tac");
  return { ok: true };
}

export async function togglePartner(
  id: string,
  isActive: boolean
): Promise<{ ok: true } | { ok: false; error: string }> {
  const session = await getSession();
  if (!session) return { ok: false, error: "Chưa đăng nhập" };

  const supabase = getServiceSupabase();
  const { error } = await supabase
    .from("partners")
    .update({ is_active: isActive })
    .eq("id", id);

  if (error) return { ok: false, error: error.message };

  revalidatePath("/admin/doi-tac");
  return { ok: true };
}
