import { useQuery } from "@tanstack/react-query";
import {api} from "@/shared/api/axiosInstance";

export function useGetCondition(id: number) {
    return useQuery({
        queryKey: ["condition", id],
        queryFn: async () => {
            const { data } = await api.get(`/dictionaries/${id}`);
            return data;
        },
    });
}
