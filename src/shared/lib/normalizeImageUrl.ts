const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL || "http://26.116.23.173:8888";


export function normalizeImageUrl(url?: string): string {
    if (!url) return "/placeholder.jpg";

    // убираем абсолютный адрес и делаем относительный
    if (url.startsWith("http://localhost:8888") || url.startsWith(BUCKET_URL)) {
        return url.replace(/^http?:\/\/[^/]+/, BUCKET_URL); // => /accommodation-images/retrieve/files/...
    }

    return url;
}
