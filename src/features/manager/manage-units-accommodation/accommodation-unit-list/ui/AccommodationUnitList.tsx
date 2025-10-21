import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {data} from "@/features/manager/manage-units-accommodation/accommodation-unit-list/model/constants";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";

export function AccommodationUnitList() {
    return (
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
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell
                            className="min-w-[100px] truncate overflow-hidden"
                            title={item.description}
                        >
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
    )
}