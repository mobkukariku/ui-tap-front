import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SearchRequestCredientials} from "@/features/client/send-request/client-search-input/model/types";
import {postSearchRequest} from "@/features/client/send-request/client-search-input/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

export function usePostSearchRequests() {
    const queryClient = useQueryClient();


    return useMutation({
        mutationFn: async (data: SearchRequestCredientials) =>
            postSearchRequest(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["search-requests"],
                exact: false
            });
            toast.success("Запрос был сделан.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            })
        },
        onError: (error) => {
            toast.error("Ошибка создания запроса", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });
            return error.message;
        },
        onSettled: () => {
            console.log("onSettled");
        },
    })
}