"use server";

import { createClient } from "@/lib/supabase/server";

export async function getEmailPrefs(): Promise<{ remindersOn: boolean; remindDays: number } | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("user_email_prefs")
    .select("reminders_on, remind_days")
    .eq("user_id", user.id)
    .single();

  if (!data) return { remindersOn: true, remindDays: 7 };
  return {
    remindersOn: data.reminders_on as boolean,
    remindDays: data.remind_days as number,
  };
}

export async function saveEmailPrefs(
  remindersOn: boolean,
  remindDays: number
): Promise<{ ok: boolean; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Chưa đăng nhập" };

  const { error } = await supabase.from("user_email_prefs").upsert(
    {
      user_id: user.id,
      reminders_on: remindersOn,
      remind_days: remindDays,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id" }
  );

  if (error) return { ok: false, error: error.message };
  return { ok: true };
}
