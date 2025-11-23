import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createPriceRequest} from "@/features/manager/requests/create-price-request/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {PriceRequestCredetials} from "@/features/manager/requests/create-price-request/model/types";

export function usePostPriceRequest() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:PriceRequestCredetials) => createPriceRequest(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ['relevant-requests']});
            toast.success("Заявка цены была создана.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: (error) => {
            toast.error("Ошибка создания заявки цены.", {
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