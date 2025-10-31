"use client"
import {getDictionaries} from "@/entities/dictionary/model/api/api";
import {DictionaryCredentials} from "@/entities/dictionary/model/types";
import {useQuery} from "@tanstack/react-query";


export function useDictionary(type: string) {
    const payload: DictionaryCredentials = {
        isDeleted: false,
        keys: type ? [type] : null,
        values: null
    };

    return useQuery({
        queryKey: ["dictionary", type],
        queryFn: () => getDictionaries(payload),
        enabled: true,
    });
}