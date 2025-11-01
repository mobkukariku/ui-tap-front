"use client"
import {getDictionaries} from "@/entities/dictionary/model/api/api";
import {DictionaryCredentials} from "@/entities/dictionary/model/types";
import {useQuery} from "@tanstack/react-query";


export function useDictionary(type: string, page, size) {
    const payload: DictionaryCredentials = {
        isDeleted: false,
        keys: type ? [type] : null,
        values: null,
        page,
        size,
    };

    return useQuery({
        queryKey: ["dictionary", type, page, size],
        queryFn: () => getDictionaries(payload),
        keepPreviousData: true
    });
}