"use client";

import { useState } from "react";
import { assignHelpRequest, completeHelpRequest } from "./actions";

type Partner = { id: string; name: string };

export function AssignForm({
  requestId,
  partners,
  currentStatus,
}: {
  requestId: string;
  partners: Partner[];
  currentStatus: string;
}) {
  const [partnerId, setPartnerId] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAssign() {
    setLoading(true);
    setError("");
    const result = await assignHelpRequest(requestId, partnerId, note);
    setLoading(false);
    if (!result.ok) setError(result.error);
  }

  async function handleComplete() {
    setLoading(true);
    setError("");
    const result = await completeHelpRequest(requestId);
    setLoading(false);
    if (!result.ok) setError(result.error);
  }

  return (
    <div className="mt-3 space-y-2 border-t border-border pt-3">
      {currentStatus !== "completed" && (
        <>
          {partners.length > 0 && (
            <select
              value={partnerId}
              onChange={(e) => setPartnerId(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:border-accent focus:outline-none"
            >
              <option value="">Chọn đối tác (không bắt buộc)</option>
              {partners.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú hoa hồng (không bắt buộc)"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground placeholder:text-muted focus:border-accent focus:outline-none"
          />
          {error && <p className="text-xs text-danger">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={handleAssign}
              disabled={loading}
              className="flex-1 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "..." : currentStatus === "new" ? "Giao việc" : "Cập nhật"}
            </button>
            {currentStatus === "assigned" && (
              <button
                onClick={handleComplete}
                disabled={loading}
                className="rounded-lg bg-success px-3 py-2 text-xs font-semibold text-white hover:opacity-90 disabled:opacity-50"
              >
                {loading ? "..." : "✓ Hoàn thành"}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
