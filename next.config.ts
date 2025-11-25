import type { NextConfig } from "next";

const API_URL = process.env.API_URL || "http://26.153.34.218:8080";
const BUCKET_URL = process.env.BUCKET_URL || "http://26.153.34.218:8888";


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
