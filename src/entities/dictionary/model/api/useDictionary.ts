"use client";
import { getDictionaries } from "@/entities/dictionary/model/api/api";
import { useQuery } from "@tanstack/react-query";
import { useDictionaryFilter } from "@/entities/dictionary/model/store/useDictionaryFilter";

export function useDictionary(key: string, size?: string) {
    const { filters } = useDictionaryFilter();

    const payload = {
        keys: key ? [key] : null,
        ...filters,
        size: size ?? filters.size ?? 20, // 👈 приоритет: переданный > из стора > дефолт
    };

    return useQuery({
        queryKey: ["dictionary", key, payload.size, filters],
        queryFn: () => getDictionaries(payload),
    });
}
