import {useQuery} from "@tanstack/react-query";
import {
    getAccommodationById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-header/model/api/api";

export function useGetAccommodationById(id: string) {

    return useQuery({
        queryKey: ["accommodation"],
        queryFn: () => getAccommodationById(Number(id))
    })
}