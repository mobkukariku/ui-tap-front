import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

if (!API_URL) {
    throw new Error("API_URL environment variable is not set");
}

if (!BUCKET_URL) {
    throw new Error("BUCKET_URL environment variable is not set");
}

const nextConfig: NextConfig = {
    output: 'standalone',
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: `${API_URL}/api/:path*`
            },
            {
                source: "/accommodation-images/:paths*",
                destination: `${BUCKET_URL}/accommodation-images/:paths*`
            }
        ];
    },
};

export default nextConfig;
