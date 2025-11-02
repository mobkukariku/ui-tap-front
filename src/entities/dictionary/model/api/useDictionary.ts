"use client";
import { getDictionaries } from "@/entities/dictionary/model/api/api";
import { useQuery } from "@tanstack/react-query";
import { useDictionaryFilter } from "@/entities/dictionary/model/store/useDictionaryFilter";

export function useDictionary(key: string) {
    const { filters } = useDictionaryFilter();

    const payload = {
        keys: key ? [key] : null,
        ...filters,
    };

    return useQuery({
        queryKey: ["dictionary", key, filters],
        queryFn: () => getDictionaries(payload)
    });
}
