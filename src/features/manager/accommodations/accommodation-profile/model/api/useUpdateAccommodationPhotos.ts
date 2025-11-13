import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationPhotos} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import { UpdateAccommodationPhotosRequest } from "../types";

export function useUpdateAccommodationPhotos() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationPhotosRequest) => updateAccommodationPhotos(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотографии успешно обновлены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error: any) => {
            toast.error("Ошибка обновления фотографий", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        }
    });
}

