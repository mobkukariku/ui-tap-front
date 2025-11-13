"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useGetAccommodationUnits } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnits";
import { AccommodationUnit } from "@/entities/accommodation-unit/model/types";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { useState } from "react";
import {
  AccommodationUnitModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/AccommodationUnitModal";
import {Spinner} from "@/shared/ui/spinner";

interface AccommodationUnitListProps {
  accommodationId: string;
}


export function AccommodationUnitList({accommodationId}:AccommodationUnitListProps) {
  const { data, isLoading, isError } = useGetAccommodationUnits(accommodationId);
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />
  if (isError) return <p className="text-center py-8 text-red-500">Ошибка загрузки</p>;


  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Вместительность</TableHead>
            <TableHead>Площадь</TableHead>
            <TableHead>Этаж</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-center">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((item: AccommodationUnit) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.capacity}</TableCell>
              <TableCell>{item.area} м²</TableCell>
              <TableCell>{item.floor}</TableCell>
              <TableCell>
                {item.isAvailable ? (
                  <Badge className="bg-green-50 text-green-700">Доступно</Badge>
                ) : (
                  <Badge variant="destructive">Занято</Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Button size="sm" onClick={() => {
                  setIsModalOpen(true);
                  setSelectedId(item.id);
                }}>
                  Посмотреть
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.totalElements > 20 && (
        <div className="mt-6">
          <TablePagination
            page={page}
            totalPages={data.totalPages}
            size={10}
            onPageChange={setPage}
          />
        </div>
      )}
      <AccommodationUnitModal id={selectedId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </>
  );
}