import {useEffect, useState} from "react";
import {useDictionary} from "@/entities/dictionary/model/api/useDictionary";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/shared/ui/command";
import {Popover, PopoverContent, PopoverTrigger} from "@/shared/ui/popover";
import {Button} from "@/shared/ui/button";
import {Check, ChevronsUpDown} from "lucide-react";
import {cn} from "@/shared/lib/utils";
import {Dictionary} from "@/entities/dictionary/model/types";

interface SelectDictionaryProps {
    type: string;
    placeholder?: string;
    onChange?: (values: string[]) => void;
    value?: string[];
    multiple?: boolean;
}


export function SelectDictionary({type, placeholder="Выберите словарь", onChange, value:propValue = []}: SelectDictionaryProps) {
    const {data} = useDictionary(type ?? "");
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState<string[]>(propValue);

    // синхронизируем локальный стейт с пропсом
    useEffect(() => {
        setValue(propValue);
    }, [propValue]);

    const handleSetValue = (val: string) => {
        let newValue: string[];
        if (value.includes(val)) {
            newValue = value.filter((item) => item !== val);
        } else {
            newValue = [...value, val];
        }
        setValue(newValue);
        onChange?.(newValue); // <-- ключевой момент для RHF
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full h-fit justify-between"
                >
                    <div className="flex flex-wrap gap-2 justify-start">
                        {value?.length
                            ? value.map((val, i) => (
                                <div key={i} className="px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
                                    {data?.content.find((dictionary: Dictionary) => dictionary.id === val)?.value}
                                </div>
                            ))
                            : placeholder
                        }
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder="Search..." />
                    <CommandEmpty>No results.</CommandEmpty>
                    <CommandList className={"overflow-y-hidden"}>
                        <CommandGroup>
                            {data?.content.map((dictionary: Dictionary) => (
                                <CommandItem
                                    key={dictionary.id}
                                    value={String(dictionary.id)}
                                    onSelect={() => handleSetValue(dictionary.id as string)}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value.includes(dictionary.id as string) ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {dictionary.value}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
