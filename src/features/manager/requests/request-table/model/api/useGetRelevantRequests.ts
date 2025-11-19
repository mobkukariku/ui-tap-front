import {useQuery} from "@tanstack/react-query";
import {getRelevantRequests} from "@/features/manager/requests/request-table/model/api/api";

export function useGetRelevantRequests(id:number) {
    return useQuery({
        queryKey: ['relevant-requests'],
        queryFn: () => getRelevantRequests(id),
    })
}