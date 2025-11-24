import { useQuery } from "@tanstack/react-query";
import {getSearchRequestById} from "@/features/client/requests/client-by-request/request-by-id/model/api/api";

export function useGetSearchRequest(id: string | number) {
    return useQuery({
        queryKey: ["search-requests", "price-requests", id],
        queryFn: async () => await getSearchRequestById(id),
        enabled: !!id,
        retry: 1,
    });
}