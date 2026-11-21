import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Book cover */}
          <rect x="5" y="3" width="26" height="30" rx="4" fill="#1565c0" />
          {/* Spine */}
          <rect x="5" y="3" width="6" height="30" rx="3" fill="#0d47a1" />
          {/* Spine dots */}
          <circle cx="8" cy="10" r="1.2" fill="#1565c0" />
          <circle cx="8" cy="18" r="1.2" fill="#1565c0" />
          <circle cx="8" cy="26" r="1.2" fill="#1565c0" />
          {/* Page lines */}
          <rect x="15" y="15" width="12" height="1.8" rx="0.9" fill="white" opacity="0.75" />
          <rect x="15" y="19.5" width="12" height="1.8" rx="0.9" fill="white" opacity="0.75" />
          <rect x="15" y="24" width="8" height="1.8" rx="0.9" fill="white" opacity="0.5" />
          {/* Balance scale — gold */}
          <rect x="17.3" y="7" width="1.4" height="5" rx="0.7" fill="#f59e0b" />
          <rect x="12" y="7" width="12" height="1.2" rx="0.6" fill="#f59e0b" />
          <rect x="12" y="7" width="1.2" height="3" rx="0.6" fill="#f59e0b" />
          <rect x="22.8" y="7" width="1.2" height="3" rx="0.6" fill="#f59e0b" />
          <rect x="11" y="10" width="3.2" height="1" rx="0.5" fill="#f59e0b" />
          <rect x="21.8" y="10" width="3.2" height="1" rx="0.5" fill="#f59e0b" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
