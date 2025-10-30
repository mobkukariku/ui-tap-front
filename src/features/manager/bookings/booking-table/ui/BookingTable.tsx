'use client'

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { data as initialData } from "@/features/manager/bookings/booking-table/model/constants"
import { ArrowDownUp } from "lucide-react"

function BookingTable() {
    const [data, setData] = useState(initialData)
    const [sortState, setSortState] = useState({
        status: true,
        price: true,
        dates: true,
    })

    const sortBy = <T extends keyof typeof initialData[0]>(key: T, asc: boolean) => {
        const sorted = [...data].sort((a, b) => {
            if (a[key] < b[key]) return asc ? -1 : 1
            if (a[key] > b[key]) return asc ? 1 : -1
            return 0
        })
        setData(sorted)
    }

    const handleSortStatus = () => {
        sortBy("status", sortState.status)
        setSortState({ ...sortState, status: !sortState.status })
    }

    const handleSortPrice = () => {
        const sorted = [...data].sort((a, b) =>
            sortState.price ? a.price - b.price : b.price - a.price
        )
        setData(sorted)
        setSortState({ ...sortState, price: !sortState.price })
    }

    const handleSortDates = () => {
        const toTimestamp = (d: string) => new Date(d).getTime()
        const sorted = [...data].sort((a, b) => {
            const diff = toTimestamp(a.fromDate) - toTimestamp(b.fromDate)
            return sortState.dates ? diff : -diff
        })
        setData(sorted)
        setSortState({ ...sortState, dates: !sortState.dates })
    }

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
                            onClick={handleSortDates}
                        >
                            Даты
                            <ArrowDownUp
                                className={`opacity-60 text-[#525252] w-4 h-4 transition-transform duration-200 ${
                                    sortState.dates ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                            onClick={handleSortPrice}
                        >
                            Цена
                            <ArrowDownUp
                                className={`opacity-60 text-[#525252] w-4 h-4 transition-transform duration-200 ${
                                    sortState.price ? "rotate-180" : ""
                                }`}
                            />
                        </div>
                    </TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-2 cursor-pointer select-none"
                            onClick={handleSortStatus}
                        >
                            Статус
                            <ArrowDownUp
                                className={`opacity-60 text-[#525252] w-4 h-4 transition-transform duration-200 ${
                                    sortState.status ? "rotate-180" : ""
                                }`}
                            />
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
