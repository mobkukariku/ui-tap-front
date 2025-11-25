'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import {getBadgeVariant, getButtonsVariant} from "@/features/manager/bookings/booking-table/model/getVariantByStatus";
import {
    useGetReservationsByAccommodation
} from "@/features/manager/bookings/booking-table/model/api/useGetReservationsByAccommodation";
import {Spinner} from "@/shared/ui/spinner";

interface BookingTableProps {
    accId: number
}

function BookingTable({accId}:BookingTableProps) {

    const {data, isError, isLoading} = useGetReservationsByAccommodation(accId);

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-6 sm:my-8 md:my-10"} />

    if (isError) return (
        <div>
            Error! <button onClick={() => window.location.reload()}>Reload</button>
        </div>
    )

    return (
        <Table className="w-full relative">
            <TableHeader>
                <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            Даты
                        </div>
                    </TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            Юнит

                        </div>
                    </TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            Цена

                        </div>
                    </TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            Статус
                        </div>
                    </TableHead>
                    <TableHead className="text-center">Действия</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data?.content?.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.clientName}</TableCell>
                        <TableCell>
                            {item.checkOutDate} – {item.checkInDate}
                        </TableCell>
                        <TableCell>
                            {item.accommodationUnitName}
                        </TableCell>
                        <TableCell>{item.price} тг</TableCell>
                        <TableCell>
                            {getBadgeVariant(item.status)}
                        </TableCell>
                        <TableCell className="text-center">
                            {getButtonsVariant(item.status)}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BookingTable
