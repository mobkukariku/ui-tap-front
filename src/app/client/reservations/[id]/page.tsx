import {ReservationById} from "@/features/client/reservations/reservation-by-id/ui/ReservationById";

interface ReservationPageProps {
    params: {id: string}
}

export default async function ReservationPage({params}:ReservationPageProps) {
    const {id} = await params;

    return (
        <ReservationById id={Number(id)} />
    )
}