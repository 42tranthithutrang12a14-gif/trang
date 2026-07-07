import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder graphics under /placeholders are our own trusted local SVGs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
