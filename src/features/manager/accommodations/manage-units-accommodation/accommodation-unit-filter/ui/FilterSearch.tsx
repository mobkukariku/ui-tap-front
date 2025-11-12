"use client";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/shared/ui/input";

interface FilterSearchProps {
    defaultValue?: string;
    onSearch: (value: string) => void;
    onToggleFilters: () => void;
}

export function FilterSearch({ defaultValue, onSearch, onToggleFilters }: FilterSearchProps) {
    return (
        <form role="search" className="flex gap-3 items-center flex-row max-w-md">
            <fieldset className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                <Input
                    id="condition-search"
                    placeholder="Найти условие..."
                    className="pl-9"
                    defaultValue={defaultValue}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </fieldset>

            <fieldset>
                <SlidersHorizontal onClick={onToggleFilters} className="text-gray-400 cursor-pointer" />
            </fieldset>
        </form>
    );
}
