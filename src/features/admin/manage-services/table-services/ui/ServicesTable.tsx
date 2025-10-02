import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";


const data = [
    {
        id: 1,
        key: "WIFI_FREE",
        value: "Бесплатный Wi-Fi во всех зонах"
    }
]

export function ServicesTable() {

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Ключ</TableHead>
                    <TableHead>Значение</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow key={item.id}>
                        <TableCell>{item.key}</TableCell>
                        <TableCell>{item.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
