import {useMutation} from "@tanstack/react-query";
import {CreateAccommodationRequest} from "@/features/manager/accommodations/create-accommodation/model/types";
import {createAccommodation} from "@/features/manager/accommodations/create-accommodation/model/api/api";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";

export function useCreateAccommodation() {

    return useMutation({
        mutationFn: (data: CreateAccommodationRequest) => createAccommodation(data),
        onSuccess: async () => {
            toast.success("Запрос на создание успешно отправлено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error) => {
            toast.error("Ошибка отправки запроса", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });
            return error.message;
        }
    })
}