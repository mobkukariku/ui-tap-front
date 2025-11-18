import {useMutation, useQueryClient} from "@tanstack/react-query";

import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";
import {
    UpdateAccommodationUnitPhotosRequest,
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
import {
    deleteAccommodationUnitPhoto,
    updateAccommodationUnitPhotos
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/api";

export function useUpdateAccommodationUnitPhotos() {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data: UpdateAccommodationUnitPhotosRequest) =>
            updateAccommodationUnitPhotos(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотографии успешно обновлены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: async (error) => {
            toast.error("Ошибка обновления фотографий", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: (data: { id: string; photoUrl: string }) =>
            deleteAccommodationUnitPhoto(data.id, data.photoUrl),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотография удалена", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: async (error) => {
            toast.error("Ошибка удаления фотографии", {
                position: "top-right",
                richColors: true,
                description: error.message || "Не удалось удалить фото",
            });
        },
    });

    return {
        updatePhotos: updateMutation.mutate,
        updatePhotosAsync: updateMutation.mutateAsync,
        deletePhoto: deleteMutation.mutate,
        deletePhotoAsync: deleteMutation.mutateAsync,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
    };
}
