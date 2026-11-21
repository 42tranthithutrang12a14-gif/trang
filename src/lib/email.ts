import "server-only";
import { Resend } from "resend";

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("RESEND_API_KEY chưa được cấu hình");
    _resend = new Resend(key);
  }
  return _resend;
}

export function isEmailConfigured(): boolean {
  return !!process.env.RESEND_API_KEY;
}

export type ReminderItem = {
  ruleCode: string;
  title: string;
  dueDate: string;
  daysUntil: number;
};

function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split("-");
  return `${day}/${month}/${year}`;
}

function urgencyText(days: number): string {
  if (days === 0) return "Hôm nay!";
  if (days === 1) return "Ngày mai";
  return `Còn ${days} ngày`;
}

export async function sendReminderEmail({
  to,
  reminders,
  appUrl,
}: {
  to: string;
  reminders: ReminderItem[];
  appUrl: string;
}): Promise<{ ok: boolean; error?: string }> {
  const resend = getResend();

  const itemsHtml = reminders
    .map(
      (r) => `
      <tr>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#1a1a1a;">${r.title}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;color:#1a1a1a;white-space:nowrap;">${formatDate(r.dueDate)}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #f0f0f0;font-size:13px;font-weight:600;color:${r.daysUntil <= 3 ? "#dc2626" : r.daysUntil <= 7 ? "#d97706" : "#6b7280"};">${urgencyText(r.daysUntil)}</td>
      </tr>`
    )
    .join("");

  const html = `<!DOCTYPE html>
<html lang="vi">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
  <tr><td align="center">
    <table width="100%" style="max-width:520px;background:#ffffff;border-radius:16px;border:1px solid #e5e7eb;overflow:hidden;">
      <tr>
        <td style="padding:24px 28px;background:#1d4ed8;">
          <p style="margin:0;font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:#bfdbfe;">Sổ tay DN Siêu nhỏ</p>
          <h1 style="margin:4px 0 0;font-size:20px;font-weight:700;color:#ffffff;">Nhắc hạn nộp sắp đến</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:24px 28px;">
          <p style="margin:0 0 20px;font-size:14px;color:#6b7280;">Bạn có ${reminders.length} hạn nộp sắp đến:</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
            <thead>
              <tr style="background:#f9fafb;">
                <th style="padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Nghĩa vụ</th>
                <th style="padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Hạn nộp</th>
                <th style="padding:8px 12px;text-align:left;font-size:11px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Thời gian</th>
              </tr>
            </thead>
            <tbody>${itemsHtml}</tbody>
          </table>
          <div style="margin-top:24px;text-align:center;">
            <a href="${appUrl}/tai-khoan" style="display:inline-block;background:#1d4ed8;color:#ffffff;font-size:13px;font-weight:600;padding:12px 24px;border-radius:10px;text-decoration:none;">
              Xem chi tiết tài khoản →
            </a>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 28px;border-top:1px solid #f0f0f0;">
          <p style="margin:0;font-size:11px;color:#9ca3af;line-height:1.5;">
            Email này được gửi vì bạn đã lưu kết quả khám sức khỏe pháp lý.
            Thông tin mang tính tham khảo, không thay thế tư vấn chuyên nghiệp.
          </p>
        </td>
      </tr>
    </table>
  </td></tr>
</table>
</body></html>`;

  try {
    const { error } = await resend.emails.send({
      from: "Sổ tay DN Siêu nhỏ <nhac-han@" + (process.env.RESEND_FROM_DOMAIN ?? "noreply.example.com") + ">",
      to,
      subject: `Nhắc hạn nộp: ${reminders.length} deadline sắp đến — Sổ tay DN`,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}
