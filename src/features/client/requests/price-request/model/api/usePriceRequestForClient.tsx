import {useQuery, useMutation, useQueryClient} from "@tanstack/react-query";
import {getPriceRequestByRequestId, respondToPriceRequest} from "@/features/client/requests/price-request/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {useState} from "react";

export function usePriceRequestForClient(requestId: number) {
    const queryClient = useQueryClient();
    const [localStatus, setLocalStatus] = useState<"ACCEPTED" | "REJECTED" | null>(null);

    const query = useQuery({
        queryKey: ["price-requests", requestId],
        queryFn: async () => await getPriceRequestByRequestId(requestId)
    });

    const respondMutation = useMutation({
        mutationFn: (data: {priceRequestId: number; status: "ACCEPTED" | "REJECTED"}) =>
            respondToPriceRequest(data.priceRequestId, data.status),
        onSuccess: async (_, variables) => {
            setLocalStatus(variables.status);
            await queryClient.invalidateQueries({queryKey: ["price-requests", requestId]});
            const statusText = variables.status === "ACCEPTED" ? "Принято" : "Отклонено";
            toast.success(`Ответ: ${statusText}`, {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: (error) => {
            toast.error("Ошибка при отправке ответа", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова",
            });
        }
    });

    // Если пользователь уже ответил, не показываем кнопки
    const hasResponded = localStatus !== null;

    return {
        ...query,
        respond: respondMutation.mutate,
        isResponding: respondMutation.isPending,
        hasResponded,
        responseStatus: localStatus
    };
}