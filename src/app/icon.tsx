import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          background: "#1e4c74",
          borderRadius: 6,
        }}
      >
        <div style={{ width: "50%", height: "50%", background: "#faf8f4", opacity: 0.9 }} />
        <div style={{ width: "50%", height: "50%", background: "#1e4c74" }} />
        <div style={{ width: "50%", height: "50%", background: "#1e4c74" }} />
        <div style={{ width: "50%", height: "50%", background: "#faf8f4", opacity: 0.9 }} />
      </div>
    ),
    { ...size }
  );
}
