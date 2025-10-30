'use client'

import { useState, useEffect, useRef } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { Badge } from "@/shared/ui/badge"
import { Button } from "@/shared/ui/button"
import { PopupMenuButton } from "@/shared/ui/popup-menu-button"
import { data as initialData } from "@/features/manager/requests/request-table/model/constants"
import { ArrowDownUp } from "lucide-react"

export function RequestTable() {
    const [data, setData] = useState(initialData)
    const [sortAsc, setSortAsc] = useState(true)
    const [activePopup, setActivePopup] = useState<number | null>(null)
    const [respondedRows, setRespondedRows] = useState<Set<string>>(() => new Set())

    const tableRef = useRef<HTMLTableElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!tableRef.current || !event.target) return
            const isInside = (event.target as HTMLElement).closest("[data-popup]")
            if (!isInside) setActivePopup(null)
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSort = () => {
        const sorted = [...data].sort((a, b) => {
            if (a.status < b.status) return sortAsc ? -1 : 1
            if (a.status > b.status) return sortAsc ? 1 : -1
            return 0
        })
        setData(sorted)
        setSortAsc(!sortAsc)
    }

    const formatDate = (dateStr: string) => {
        const [year, month, day] = dateStr.split('-')
        return `${day}.${month}.${year}`
    }

    const toggleResponded = (id: string, add: boolean) => {
        setRespondedRows(prev => {
            const next = new Set(prev)
            add ? next.add(id) : next.delete(id)
            return next
        })
    }

    const popupOptions = [
        { label: "Принять цену" },
        { label: "Предложить цену" },
        { label: "Скрыть" },
    ]

    return (
        <Table ref={tableRef} className="w-full relative">
            <TableHeader>
                <TableRow>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Даты</TableHead>
                    <TableHead className="text-right">Стоимость</TableHead>
                    <TableHead className="text-right">Кол-во гостей</TableHead>
                    <TableHead>
                        <div
                            className="flex items-center gap-[8px] cursor-pointer select-none"
                            onClick={handleSort}
                        >
                            Статус
                            <ArrowDownUp
                                className={`opacity-60 text-[#525252] w-[16px] h-[16px] transition-transform duration-200 ${
                                    sortAsc ? 'rotate-180' : ''
                                }`}
                            />
                        </div>
                    </TableHead>
                    <TableHead>Действия</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {data.map((item) => {
                    const idStr = String(item.id)
                    const isResponded = respondedRows.has(idStr)

                    return (
                        <TableRow key={item.id}>
                            <TableCell>{item.authorId}</TableCell>
                            <TableCell>
                                {formatDate(item.fromDate)} - {formatDate(item.toDate)}
                            </TableCell>
                            <TableCell className="text-right">{item.price} тг</TableCell>
                            <TableCell className="text-right">{item.countOfPeople} человек</TableCell>
                            <TableCell>
                                {item.status === 'Открыт к запросам по цене' ? (
                                    <Badge variant="secondary">Открыт к запросам по цене</Badge>
                                ) : item.status === 'Запрос был сделан' ? (
                                    <Badge variant="waiting">Запрос был сделан</Badge>
                                ) : item.status === 'Подтверждено' ? (
                                    <Badge variant="default">Подтверждено</Badge>
                                ) : (
                                    <Badge variant="outline">{item.status}</Badge>
                                )}
                            </TableCell>

                            <TableCell>
                                <div className="relative inline-block">
                                    <Button
                                        size="sm"
                                        variant={isResponded ? "outline" : "default"}
                                        onClick={() => {
                                            if (isResponded) {
                                                toggleResponded(idStr, false)
                                                setActivePopup(null)
                                            } else {
                                                setActivePopup(item.id)
                                            }
                                        }}
                                    >
                                        {isResponded ? "Отмена" : "Откликнуться"}
                                    </Button>

                                    {activePopup === item.id && (
                                        <div
                                            data-popup
                                            className="absolute left-1/2 -translate-x-1/2 mt-[6px] w-[160px] h-[130px]
                      bg-[#FEFEFE] border border-[#9C9C9C] rounded-[12px]
                      shadow-[0_2px_4px_rgba(0,0,0,0.25)]
                      p-2 flex flex-col gap-[10px] z-10 transition-opacity duration-200"
                                        >
                                            {popupOptions.map(({ label }) => (
                                                <PopupMenuButton
                                                    key={label}
                                                    onClick={() => {
                                                        toggleResponded(idStr, true)
                                                        setActivePopup(null)
                                                    }}
                                                >
                                                    {label}
                                                </PopupMenuButton>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
