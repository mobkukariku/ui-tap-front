"use client"
import {useQuery} from "@tanstack/react-query";
import {getMySearchRequests} from "@/features/client/requests/client-my-list-requests/model/api/api";

export function useMySearchRequests() {
    return useQuery({
        queryKey: ["search-requests"],
        queryFn: async () => await getMySearchRequests(),
    })
}