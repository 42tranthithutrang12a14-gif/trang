"use client";

import { useState } from "react";
import { saveEmailPrefs } from "@/app/actions/email-prefs";

export function EmailPrefsForm({
  initialRemindersOn,
  initialRemindDays,
}: {
  initialRemindersOn: boolean;
  initialRemindDays: number;
}) {
  const [remindersOn, setRemindersOn] = useState(initialRemindersOn);
  const [remindDays, setRemindDays] = useState(initialRemindDays);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    const result = await saveEmailPrefs(remindersOn, remindDays);
    setSaving(false);
    if (result.ok) setSaved(true);
    else setError(result.error ?? "Không thể lưu cài đặt.");
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 space-y-4">
      <label className="flex items-center gap-3 cursor-pointer">
        <div
          onClick={() => setRemindersOn((v) => !v)}
          className={`relative h-6 w-11 rounded-full transition-colors ${remindersOn ? "bg-accent" : "bg-muted/30"}`}
        >
          <span
            className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${remindersOn ? "translate-x-5" : ""}`}
          />
        </div>
        <span className="text-sm font-medium text-foreground">
          Nhận email nhắc hạn nộp
        </span>
      </label>

      {remindersOn && (
        <div>
          <label className="block text-xs font-medium text-muted mb-1">
            Nhắc trước bao nhiêu ngày
          </label>
          <select
            value={remindDays}
            onChange={(e) => setRemindDays(Number(e.target.value))}
            className="rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-accent focus:outline-none"
          >
            <option value={3}>3 ngày</option>
            <option value={7}>7 ngày</option>
            <option value={14}>14 ngày</option>
          </select>
        </div>
      )}

      {error && <p className="text-xs text-danger">{error}</p>}
      {saved && <p className="text-xs text-success">✓ Đã lưu cài đặt.</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-xl bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-50 transition-colors"
      >
        {saving ? "Đang lưu..." : "Lưu cài đặt"}
      </button>

      <p className="text-xs text-muted">
        Email nhắc nhở sẽ được gửi tới địa chỉ email đăng nhập của bạn trước ngày hạn nộp.
      </p>
    </div>
  );
}
