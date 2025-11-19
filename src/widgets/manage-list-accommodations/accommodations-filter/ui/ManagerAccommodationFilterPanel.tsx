"use client"
import {PlusIcon, Search} from "lucide-react";
import {Input} from "@/shared/ui/input";
import {Button} from "@/shared/ui/button";
import Link from "next/link";
import {useDebounce} from "@/shared/hooks/useDebounce";
import {AccommodationRequest} from "@/widgets/manage-list-accommodations/accommodations-list/model/types";
import {
    useMyAccommodationFilter
} from "@/widgets/manage-list-accommodations/accommodations-filter/model/store/useMyAccommodationFilter";


interface ManagerAccommodationFilterPanelProps {
    hasAddButton?: boolean;
}

export function ManagerAccommodationFilterPanel({hasAddButton} : ManagerAccommodationFilterPanelProps) {
    const {filters, setFilter} = useMyAccommodationFilter();

    const debouncedSearch = useDebounce((value: AccommodationRequest) => {
        Object.entries(value).forEach(([key, value]) => {
            setFilter(key as keyof AccommodationRequest, value);
        });
    }, 400);


    return (
        <section className={"mt-5 mb-10 flex justify-between"}>
            <form role="search" className="flex-1 max-w-md">
                <fieldset
                    className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <Input
                        id="accommondation-search"
                        placeholder="Искать объект"
                        className="pl-9"
                        defaultValue={filters.name ?? ""}
                        onChange={(e) => debouncedSearch({ name: e.target.value })}
                    />
                </fieldset>
            </form>
            {hasAddButton && (
                <Link href={"/manager/accommodations/create"}>
                    <Button>
                        <PlusIcon  />
                        Добавить жилье
                    </Button>
                </Link>
            )}
        </section>
    )
}

