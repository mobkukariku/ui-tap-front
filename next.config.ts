import type { NextConfig } from "next";

const API_URL = process.env.API_URL || "http://26.116.23.173:8080";
const BUCKET_URL = process.env.BUCKET_URL || "http://26.116.23.173:8888";


const nextConfig: NextConfig = {

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
