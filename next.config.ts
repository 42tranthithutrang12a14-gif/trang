import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder graphics under /placeholders are our own trusted local SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
    ],
  },
  experimental: {
    serverActions: {
      // Mặc định 1MB quá nhỏ cho form có nhiều ảnh (sản phẩm, logo, banner).
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
