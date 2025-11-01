"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { useDictionary } from "@/entities/dictionary/model/api/useDictionary";
import { useState } from "react";
import {TablePagination} from "@/widgets/pagination/ui/TablePagination";
import {Dictionary} from "@/entities/dictionary/model/types";

export function ServicesTable() {
    const [page, setPage] = useState(0);

    const { data, isLoading, isError } = useDictionary("ACC_SERVICE",null, page);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading services</p>;

    return (
        <>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Значение</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item:Dictionary) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.value}</TableCell>
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
    );
}
