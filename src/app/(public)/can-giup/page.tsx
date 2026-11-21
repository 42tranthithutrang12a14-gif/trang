"use client";

import { useState } from "react";
import { submitHelpRequest } from "@/app/actions/help-request";

export default function CanGiupPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <p className="text-4xl mb-4">✅</p>
        <h1 className="text-xl font-bold text-foreground mb-2">Đã nhận yêu cầu!</h1>
        <p className="text-sm text-muted">
          Chúng tôi sẽ liên hệ với bạn trong vòng 1 ngày làm việc để giới thiệu đối tác phù hợp.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-2">Hỗ trợ</p>
        <h1 className="text-2xl font-bold text-foreground">Cần người làm giúp?</h1>
        <p className="mt-3 text-sm text-muted max-w-sm mx-auto">
          Điền thông tin bên dưới — chúng tôi sẽ kết nối bạn với kế toán hoặc tư vấn pháp lý uy tín trong khu vực.
        </p>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Họ tên <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nguyễn Văn A"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Số điện thoại <span className="text-danger">*</span>
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0901 234 567"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Email (không bắt buộc)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-foreground mb-1.5">
              Mô tả nhu cầu (không bắt buộc)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Vd: Cần kế toán làm BCTC năm, báo cáo thuế GTGT hàng tháng..."
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-accent focus:outline-none resize-none"
            />
          </div>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-border accent-accent"
            />
            <span className="text-xs text-muted leading-relaxed">
              Tôi đồng ý để thông tin trên được chuyển cho đối tác kế toán/pháp lý để liên hệ tư vấn.
              Thông tin chỉ dùng cho mục đích này và không được chia sẻ với bên thứ ba khác.
            </span>
          </label>

          {error && <p className="text-xs text-danger">{error}</p>}

          <button
            onClick={async () => {
              setSubmitting(true);
              setError("");
              const result = await submitHelpRequest({
                contactName: name,
                contactPhone: phone,
                contactEmail: email,
                notes,
                consent,
              });
              setSubmitting(false);
              if (result.ok) {
                setSubmitted(true);
              } else {
                setError(result.error);
              }
            }}
            disabled={submitting}
            className="w-full rounded-xl bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-accent-dark transition-colors disabled:opacity-50"
          >
            {submitting ? "Đang gửi..." : "Gửi yêu cầu →"}
          </button>
        </div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        Dịch vụ này miễn phí cho bạn. Chúng tôi nhận hoa hồng từ đối tác nếu hợp tác thành công.
      </p>
    </div>
  );
}
