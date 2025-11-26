import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeReservationStatus} from "@/features/manager/bookings/booking-table/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

interface PutReservationStatusParams {
    reservationId: number,
    status: string
}

export function usePutReservationStatus() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({reservationId, status}:PutReservationStatusParams)=> changeReservationStatus(reservationId,status),
        onSuccess: async () => {
            await queryClient.invalidateQueries({queryKey: ["reservations"], exact:false});
            toast.success("Статус бронирования было обновлено.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: async (error) => {
            toast.error("Ошибка обновления статуса", {
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