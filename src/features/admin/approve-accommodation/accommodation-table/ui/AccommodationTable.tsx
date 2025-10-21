import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {Badge} from "@/shared/ui/badge";
import {Button} from "@/shared/ui/button";
import {data} from "@/features/admin/approve-accommodation/accommodation-table/model/constants";



export function AccommodationTable() {
    return (
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
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.rating}</TableCell>
                        <TableCell>
                            {item.approved ? (
                                <Badge>Одобрено</Badge>
                            ) : (
                                <Badge variant="waiting">На рассмотрении</Badge>
                            )}
                        </TableCell>
                        <TableCell>
                            {!item.approved ? ( <menu className={"flex gap-2"}>
                                <Button size={"sm"}>Подтвердить</Button>
                            </menu>): null}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}