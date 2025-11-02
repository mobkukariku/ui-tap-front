"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { useDictionary } from "@/entities/dictionary/model/api/useDictionary";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { Dictionary } from "@/entities/dictionary/model/types";
import { useDictionaryFilter } from "@/entities/dictionary/model/store/useDictionaryFilter";

export function ConditionTable() {
    const { filters, setFilter } = useDictionaryFilter();
    const { data, isLoading, isError } = useDictionary("ACC_CONDITION");

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading services</p>;

    return (
        <>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Ключ</TableHead>
                        <TableHead>Значение</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.content.map((item: Dictionary) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.id}</TableCell>
                            <TableCell>{item.value}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {data?.totalElements > 20 && (
                <TablePagination
                    page={filters.page ?? 0}
                    totalPages={data.totalPages}
                    size={filters.size ?? 0}
                    onPageChange={(newPage) => setFilter("page", newPage)} // ✅ вот правильный способ
                />
            )}
        </>
    );
}
