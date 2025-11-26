import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createTariff} from "./api";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {CreateTariffRequest} from "../types";

export function useCreateTariff(unitId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateTariffRequest) => createTariff(unitId, data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation-unit", unitId]});
            await queryClient.invalidateQueries({queryKey: ["accommodation-units"]});
            toast.success("Тариф успешно создан", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error) => {
            toast.error("Ошибка создания тарифа", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        }
    });
}

