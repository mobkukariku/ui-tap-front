import {useQuery} from "@tanstack/react-query";
import {getMyReservations} from "@/features/client/reservations/reservation-list/model/api/api";

export function useMyReservations() {

    return useQuery({
        queryKey: ["my-reservations"],
        queryFn: async () => await getMyReservations(),
    })
}