import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {removeService} from "@/features/admin/manage-services/remove-service/model/api/api";

export function useRemoveService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removeService(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
            toast.success("Услуга была удалена.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: async (error) => {
            toast.error("Ошибка удаления услуги", {
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