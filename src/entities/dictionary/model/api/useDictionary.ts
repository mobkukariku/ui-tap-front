"use client"
import {getDictionaries} from "@/entities/dictionary/model/api/api";
import {DictionaryCredentials} from "@/entities/dictionary/model/types";
import {useQuery} from "@tanstack/react-query";




export function useDictionary(key: string, value: string | null, page = 0, size = 20) {
    const payload: DictionaryCredentials = {
        isDeleted: false,
        keys: key ? [key] : null,
        value: value ? value : null,
        page,
        size,
    };

    return useQuery({
        queryKey: ["dictionary", key, page, size, value],
        queryFn: () => getDictionaries(payload)
    });
}