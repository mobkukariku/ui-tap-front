import {useMutation, useQueryClient} from "@tanstack/react-query";
import {removeCondition} from "@/features/admin/manage-conditions/remove-condition/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

export function useRemoveCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => removeCondition(id),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            });
            toast.success("Условие было удалено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: async (error) => {
            toast.error("Ошибка удаления условия", {
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