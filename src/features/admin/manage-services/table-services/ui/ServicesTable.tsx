"use client"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/shared/ui/table";
import {useDictionary} from "@/entities/dictionary/model/api/useDictionary";


// const data = [
//     {
//         id: 1,
//         key: "WIFI_FREE",
//         value: "Бесплатный Wi-Fi во всех зонах"
//     }
// ]

export function ServicesTable() {
    const { data, isLoading, error } = useDictionary(null);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading departments</p>;

    console.log(data);

    return (
        <Table className="w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Ключ</TableHead>
                    <TableHead>Значение</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/*{data.map((item) => (*/}
                {/*    <TableRow key={item.id}>*/}
                {/*        <TableCell>{item.key}</TableCell>*/}
                {/*        <TableCell>{item.value}</TableCell>*/}
                {/*    </TableRow>*/}
                {/*))}*/}
            </TableBody>
        </Table>
    )
}
