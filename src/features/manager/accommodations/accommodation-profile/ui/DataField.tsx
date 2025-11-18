import { Label } from "@/shared/ui/label";
import {Dictionary} from "@/entities/dictionary/model/types";

interface DataFieldProps {
    icon: React.ElementType;
    label: string;
    value: string;
}

export function DataField({ icon: Icon, label, value }: DataFieldProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>{label}</Label>
            <div className="w-full gap-2 min-h-12  items-center flex flex-row p-1 px-4 h-fit bg-white rounded-xl border">
                <Icon className="min-w-5 h-5 text-gray-500" />
                <p className={"break-all"}>{value}</p>
            </div>
        </div>
    );
}

interface DictionaryFieldProps {
    label: string;
    values?: Dictionary[];
}

export function DictionaryField({ label, values }: DictionaryFieldProps) {
    return (
        <div className="flex flex-col w-full gap-2">
            <Label>{label}</Label>
            <div className="w-full gap-2 items-center flex flex-row p-4 min-h-12 flex-wrap  bg-white rounded-xl border">
                {values ? values.map((value) => (
                    <p  className={"text-[12px] border rounded-full px-4 py-1 bg-[#D1E1FF] border-[#355694]"} key={value?.id}>{value?.value}</p>
                )): (
                    <p className={"opacity-50"}>Пока пусто</p>
                )}
            </div>
        </div>
    )
}
