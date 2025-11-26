const BUCKET_URL = process.env.BUCKET_URL || "http://26.116.23.173:8888";
const INITIAL_URL = process.env.NEXT_PUBLIC_INITIAL_GET_FILES_URL || "http://26.116.23.173:8888";

export function normalizeImageUrl(url?: string): string {
    if (!url) return "/placeholder.jpg";

    if (url.startsWith(INITIAL_URL) || url.startsWith(BUCKET_URL)) {
        return url.replace(/^http?:\/\/[^/]+/, BUCKET_URL);
    }

    return url;
}
