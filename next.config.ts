import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://26.153.34.218:8080/api/:path*"
            },
        ];
    },
};

export default nextConfig;
