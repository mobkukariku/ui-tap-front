import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationMainInfo} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import { UpdateAccommodationMainInfoRequest } from "../types";

export function useUpdateAccommodationMainInfo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationMainInfoRequest) => updateAccommodationMainInfo(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Основная информация успешно обновлена", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error: any) => {
            toast.error("Ошибка обновления основной информации", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        }
    });
}

