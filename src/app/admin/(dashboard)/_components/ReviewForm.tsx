"use client";

import { useState } from "react";
import { updateRuleStatus } from "../actions/review";

type RuleType = "obligation" | "risk";
type RuleStatus = "draft" | "in_review" | "reviewed" | "published";

const STATUS_OPTIONS: { value: RuleStatus; label: string }[] = [
  { value: "draft", label: "Bản nháp" },
  { value: "in_review", label: "Đang xem xét" },
  { value: "reviewed", label: "Đã xem xét" },
  { value: "published", label: "Đã xuất bản" },
];

export function ReviewForm({
  ruleCode,
  ruleType,
  currentStatus,
}: {
  ruleCode: string;
  ruleType: RuleType;
  currentStatus: string;
}) {
  const [status, setStatus] = useState<RuleStatus>((currentStatus as RuleStatus) ?? "draft");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    const result = await updateRuleStatus(ruleCode, ruleType, status, note);
    setSaving(false);
    if (result.ok) {
      setSaved(true);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="rounded-2xl border-2 border-accent/20 bg-surface p-5">
      <h2 className="text-sm font-bold text-foreground mb-4">Cập nhật trạng thái duyệt</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-muted mb-1">Trạng thái</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as RuleStatus)}
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-muted mb-1">
            Ghi chú của người xem xét (không bắt buộc)
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Nhập ghi chú về quá trình xem xét..."
            className="w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-accent focus:outline-none resize-none"
          />
        </div>

        {status === "published" && (
          <div className="rounded-lg border border-danger/30 bg-danger-bg px-4 py-3 text-xs text-danger">
            ⚠️ Bạn đang xuất bản nội dung này cho người dùng thực. Chỉ thực hiện khi kế toán/luật sư đã xác nhận.
          </div>
        )}

        {error && <p className="text-xs text-danger">{error}</p>}
        {saved && <p className="text-xs text-success">✓ Đã lưu trạng thái thành công.</p>}

        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50 transition-colors"
        >
          {saving ? "Đang lưu..." : "Lưu trạng thái"}
        </button>
      </form>
    </div>
  );
}
