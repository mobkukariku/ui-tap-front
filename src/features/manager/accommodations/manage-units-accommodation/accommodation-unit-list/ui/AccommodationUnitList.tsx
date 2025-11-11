"use client";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";
import {
    useGetAccommodationUnits
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnits";
import {AccommodationUnit} from "@/entities/accommodation-unit/model/types";
import {TablePagination} from "@/widgets/pagination/ui/TablePagination";
import {useState} from "react";

export function AccommodationUnitList() {
    const {data, isLoading, isError} = useGetAccommodationUnits();
    const [page, setPage] = useState(0);


    if(isLoading) return <p>Loading...</p>

    if(isError) return <p>error</p>

    return (
       <>
           <Table className={"w-full"}>
               <TableHeader>
                   <TableRow>
                       <TableHead>Название</TableHead>
                       <TableHead>Описание</TableHead>
                       <TableHead>Вместительность</TableHead>
                       <TableHead>Площадь</TableHead>
                       <TableHead>Этаж</TableHead>
                       <TableHead>Статус</TableHead>
                       <TableHead className={"flex justify-center items-center"}>Действия</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {data?.content.map((item:AccommodationUnit) => (
                       <TableRow key={item.id}>
                           <TableCell>{item.name}</TableCell>
                           <TableCell
                               className="min-w-[100px] truncate overflow-hidden">
                               {item.description}
                           </TableCell>

                           <TableCell >{item.capacity}</TableCell>
                           <TableCell>{item.area}</TableCell>
                           <TableCell>{item.floor}</TableCell>
                           <TableCell>{item.isAvailable ? <Badge>Доступно</Badge> : <Badge variant={"destructive"}>Занято</Badge>}</TableCell>
                           <TableCell  align={"center"}><Button size={"sm"}>Посмотреть</Button></TableCell>
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