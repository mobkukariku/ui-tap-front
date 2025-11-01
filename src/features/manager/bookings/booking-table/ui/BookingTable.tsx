'use client'

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { data as initialData } from "@/features/manager/bookings/booking-table/model/constants"

function BookingTable() {
    const [data] = useState(initialData);


    const getBadgeVariant = (status: string) => {
        switch (status) {
            case "Ожидает подтверждениявв":
                return "secondary"
            case "Ожидает подтверждения":
                return "waiting"
            case "Подтверждено":
                return "default"
            case "Отменено":
                return "destructive"
            default:
                return "outline"
        }
    }

    const formatDate = (dateStr: string) =>
        new Date(dateStr).toLocaleDateString("ru-RU")

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
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.clientId}</TableCell>
                        <TableCell>
                            {formatDate(item.fromDate)} – {formatDate(item.toDate)}
                        </TableCell>
                        <TableCell>{item.price} тг</TableCell>
                        <TableCell>
                            <Badge variant={getBadgeVariant(item.status)}>
                                {item.status}
                            </Badge>
                        </TableCell>
                        <TableCell className="text-center">
                            <Button className="me-2" size="sm" variant="default">
                                Подтвердить
                            </Button>
                            <Button size="sm" variant="outline">
                                Отмена
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default BookingTable
