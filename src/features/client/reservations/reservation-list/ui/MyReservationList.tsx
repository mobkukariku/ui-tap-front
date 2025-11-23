'use client'
import {Building2} from "lucide-react";
import {ReservationItem} from "@/features/client/reservations/reservation-list/ui/MyReservationItem";
import {useMyReservations} from "@/features/client/reservations/reservation-list/model/api/useMyReservations";
import {Spinner} from "@/shared/ui/spinner";
import {Reservation} from "@/entities/reservation/model/types";

export function MyReservationList() {

    const {data, isError, isLoading} = useMyReservations();


    if(isError) return <p>Error</p>

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-end mb-6">
                <span className="text-sm text-gray-600">
                    {data?.content.length} бронирований
                </span>
            </div>

            <div className="grid gap-4">
                {data?.content?.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                        <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">У вас нет бронирований</p>
                    </div>
                ) : (
                    data?.content?.map((reservation:Reservation) => (
                        <ReservationItem
                            key={reservation.id}
                            reservation={reservation}
                        />
                    ))
                )}
            </div>
        </div>
    );
}