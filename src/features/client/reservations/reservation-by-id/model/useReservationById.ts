import {useQuery} from "@tanstack/react-query";
import {getReservationById} from "@/features/client/reservations/reservation-by-id/model/api/api";

export function useReservationById(id:number){
    return useQuery({
        queryKey: ["reservation-by-id"],
        queryFn: async () => await getReservationById(id)
    })
}