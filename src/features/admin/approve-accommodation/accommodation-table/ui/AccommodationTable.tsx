"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";
import {useAccommodations} from "@/features/admin/approve-accommodation/accommodation-table/model/api/useAccommodations";
import {Accommodation} from "@/entities/accommodation/model/types";
import {TablePagination} from "@/widgets/pagination/ui/TablePagination";
import {useState} from "react";



export function AccommodationTable() {
    const [page, setPage] = useState(0);

    const {
        data,
        isLoading,
        isError,
        approveAccommodation,
        rejectAccommodation,
        approving,
        rejecting
    } = useAccommodations();

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>Error loading services</p>;

    return (
        <>
            <Table className={"w-full"}>
                <TableHeader>
                    <TableRow>
                        <TableHead>Название</TableHead>
                        <TableHead>Описание</TableHead>
                        <TableHead>Адрес</TableHead>
                        <TableHead>Рейтинг</TableHead>
                        <TableHead>Статус</TableHead>
                        <TableHead>Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item:Accommodation) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.address}</TableCell>
                            <TableCell>{item.rating}</TableCell>
                            <TableCell>
                                {item.approved === true ? (
                                    <Badge>Одобрено</Badge>
                                ) : item.approved === false ? (
                                    <Badge variant="destructive">Отменено</Badge>
                                ) : (
                                    <Badge variant="waiting">На рассмотрении</Badge>
                                )}
                            </TableCell>
                            <TableCell>
                                {item.approved === null ? ( <menu className={"flex gap-2"}>
                                    <Button
                                        onClick={() => approveAccommodation(item.id)}
                                        size={"sm"}
                                        disabled={approving}
                                    >
                                        Подтвердить
                                    </Button>
                                    <Button
                                        size={"sm"}
                                        variant="outline"
                                        disabled={rejecting}
                                        onClick={() => rejectAccommodation(item.id)}
                                    >
                                        Отмена
                                    </Button>
                                </menu>): null}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {data?.totalElements > 20 && (
                <TablePagination
                    page={page}
                    totalPages={data.totalPages}
                    size={10}
                    onPageChange={setPage}
                />
            )}
        </>
    )
}