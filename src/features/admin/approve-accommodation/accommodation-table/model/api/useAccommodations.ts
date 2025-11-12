"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    approveAccommodation,
    getAccommodation, rejectAccommodation
} from "@/features/admin/approve-accommodation/accommodation-table/model/api/api";
import {
    useAccommodationFilter
} from "@/features/admin/approve-accommodation/filter-accommodation/model/store/useAccommodationFilter";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";


export function useAccommodations() {
    const queryClient = useQueryClient();


    const {filters} = useAccommodationFilter();

    const accommodationsQuery = useQuery({
        queryKey: ["accommodations", filters],
        queryFn: () => getAccommodation(filters),
    });

    const approveMutation = useMutation({
        mutationFn: (id: string) => approveAccommodation(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["accommodations"] });
            toast.success("Accommodations одобрен.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: (error) => {
            toast.error("Ошибка подтверждения", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });
            return error.message;
        }
    });

    const rejectMutation = useMutation({
        mutationFn: (id: string) => rejectAccommodation(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["accommodations"] });
            toast.info("Accommodations отклонен.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: (error) => {
            toast.error("Ошибка отклонения", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });

            return error.message;
        }
    });

    return {
        ...accommodationsQuery,
        approveAccommodation: approveMutation.mutate,
        rejectAccommodation: rejectMutation.mutate,
        approving: approveMutation.isPending,
        rejecting: rejectMutation.isPending,
    };
}
