import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";


const data = [
    {
        id: 1,
        key: "NO_CHILDREN",
        value: "Проживание без детей (18+ или 16+)"
    }
]

export function ConditionTable() {

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
