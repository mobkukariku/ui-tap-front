import {useQuery} from "@tanstack/react-query";
import {getReservationsByAccommodation} from "@/features/manager/bookings/booking-table/model/api/api";

export function useGetReservationsByAccommodation(accId: number) {

    return useQuery({
        queryKey: ["reservations"],
        queryFn: async() => await getReservationsByAccommodation(accId)
    })
}