import type { NextConfig } from "next";

// Set NEXT_OUTPUT=export to build plain static HTML that runs on any host,
// including cPanel shared hosting. Nothing server-side remains, so nothing
// is lost by doing so.
const isStatic = process.env.NEXT_OUTPUT === "export";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  ...(isStatic ? { output: "export", trailingSlash: true } : {}),
  images: isStatic ? { unoptimized: true } : { formats: ["image/avif", "image/webp"] },
  async headers() {
    if (isStatic) return [];
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
