"use client"
import {useQuery} from "@tanstack/react-query";
import {
    getMyAccommodations
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/api/api";
import {
    useMyAccommodationFilter
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-filter/model/store/useMyAccommodationFilter";

export function useGetMyAccommodations() {
    const { filters } = useMyAccommodationFilter();

    return useQuery({
        queryKey: ["accommodations", filters],
        queryFn: async () => getMyAccommodations(filters),
    });
}