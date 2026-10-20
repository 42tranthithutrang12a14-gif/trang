"use client";

import dynamic from "next/dynamic";

// Studio dùng canvas, video và MediaRecorder của trình duyệt nên chỉ chạy phía client.
const StudioApp = dynamic(() => import("./studio-app"), {
  ssr: false,
  loading: () => (
    <div className="grid min-h-screen place-items-center bg-[#0c0c0f] text-sm text-zinc-400">
      Đang dựng phim trường…
    </div>
  ),
});

export function StudioLoader() {
  return <StudioApp />;
}
