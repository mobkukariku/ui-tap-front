import {useMutation, useQueryClient} from "@tanstack/react-query";
import {updateRequestPriceApi} from "@/features/client/requests/client-by-request/update-request-price/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

export function useUpdateRequestPrice() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: {id: number, price: number}) => updateRequestPriceApi(data.id, data.price),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["search-requests"], exact: false});
            toast.success("Цена успешно изменилась.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: (error) => {
            toast.error("Ошибка изменения цены", {
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