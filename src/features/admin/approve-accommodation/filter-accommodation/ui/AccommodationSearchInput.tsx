"use client"
import {Input} from "@/shared/ui/input";
import {Search} from "lucide-react";
import {useDebounce} from "@/shared/hooks/useDebounce";
import {
    useAccommodationFilter
} from "@/features/admin/approve-accommodation/filter-accommodation/model/store/useAccommodationFilter";

export function AccommodationSearchInput() {
    const { filters, setFilter } = useAccommodationFilter();

    const debouncedSearch = useDebounce((value: string) => {
        setFilter("name", value);
    }, 400);

    return (
        <section className={"my-5 flex justify-between"}>
            <form role="search" className="flex-1 max-w-md">
                <fieldset
                    className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="accommondation-search"
                        placeholder="Найти Accommondation..."
                        className="pl-9"
                        defaultValue={filters.name ?? ""}
                        onChange={e => debouncedSearch(e.target.value)}
                    />
                </fieldset>
            </form>
        </section>
    )
}
