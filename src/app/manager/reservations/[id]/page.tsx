import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {BookingSearchInput} from "@/features/manager/bookings/filter-booking/ui/BookingSearchInput";
import BookingTable from "@/features/manager/bookings/booking-table/ui/BookingTable";

interface ReservationPageProps {
    params: {id: string}
}

export default async function ReservationPage({params}:ReservationPageProps) {
    const {id} = await params;

    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Бронирования", href: "/manager/reservations" },
                    { label: id, href: `/manager/reservations/${id}`},
                ]}
            />
            {/*<BookingSearchInput />*/}
            <BookingTable accId={Number(id)} />
        </>
    )
}