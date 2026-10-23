"use server";

import { createClient } from "@/lib/supabase/server";

export type AuthResult =
  | { ok: true }
  | { ok: false; error: string };

export async function signInWithEmail(email: string): Promise<AuthResult> {
  if (!email || !email.includes("@")) {
    return { ok: false, error: "Email không hợp lệ." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/callback`,
    },
  });

  if (error) {
    return { ok: false, error: "Không thể gửi email. Vui lòng thử lại." };
  }

  return { ok: true };
}

export async function signOut(): Promise<void> {
  const supabase = await createClient();
  await supabase.auth.signOut();
}
