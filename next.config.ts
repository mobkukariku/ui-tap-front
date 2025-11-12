import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://10.36.40.36:8080/api/:path*"
            },
        ];
    },
};

export default nextConfig;
