"use server";

import { createClient } from "@/lib/supabase/server";

export type HelpRequestPayload = {
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  notes: string;
  consent: boolean;
};

export async function submitHelpRequest(
  payload: HelpRequestPayload
): Promise<{ ok: true } | { ok: false; error: string }> {
  if (!payload.consent) {
    return { ok: false, error: "Bạn cần đồng ý để chúng tôi chuyển thông tin cho đối tác." };
  }
  if (!payload.contactName.trim() || !payload.contactPhone.trim()) {
    return { ok: false, error: "Vui lòng điền đầy đủ họ tên và số điện thoại." };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("help_requests").insert({
    user_id: user?.id ?? null,
    contact_name: payload.contactName.trim(),
    contact_phone: payload.contactPhone.trim(),
    contact_email: payload.contactEmail.trim() || null,
    notes: payload.notes.trim() || null,
    consent: true,
  });

  if (error) return { ok: false, error: "Không thể gửi yêu cầu. Vui lòng thử lại." };
  return { ok: true };
}
