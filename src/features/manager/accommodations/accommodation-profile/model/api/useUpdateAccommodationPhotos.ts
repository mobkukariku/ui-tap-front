import {useMutation, useQueryClient} from "@tanstack/react-query";
import {
    deleteAccommodationPhoto,
    updateAccommodationPhotos,
    UpdateAccommodationPhotosRequest
} from "./updateApi";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {toast} from "sonner";

export function useUpdateAccommodationPhotos() {
    const queryClient = useQueryClient();

    const updateMutation = useMutation({
        mutationFn: (data: UpdateAccommodationPhotosRequest) =>
            updateAccommodationPhotos(data),
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
        mutationFn: (data: { id: string; photoUrls: string[] }) =>
            deleteAccommodationPhoto(data.id, data.photoUrls),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["accommodation"]});
            toast.success("Фотографии удалены", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });
        },
        onError: async (error) => {
            toast.error("Ошибка удаления фотографий", {
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
