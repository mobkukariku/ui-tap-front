import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateAccommodationTags, UpdateAccommodationTagsRequest} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";

export function useUpdateAccommodationTags() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateAccommodationTagsRequest) => updateAccommodationTags(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Теги успешно обновлены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error) => {
            toast.error("Ошибка обновления тегов", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        }
    });
}

