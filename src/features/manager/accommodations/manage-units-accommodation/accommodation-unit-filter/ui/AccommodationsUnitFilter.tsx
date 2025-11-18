    "use client";
    import { PlusIcon } from "lucide-react";
    import { Button } from "@/shared/ui/button";
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
    import { useState, useEffect } from "react";
    import { useDebounce } from "@/shared/hooks/useDebounce";
    import {
        useAccommodationUnitFilter,
    } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-filter/model/useAccommodationUnitFilter";
    import {
        AccommodationUnitSearchCredientials,
    } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
    import {
        FilterSearch
    } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-filter/ui/FilterSearch";
    import {
        FilterSection
    } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-filter/ui/FilterSection";
    import {
        RangeFilter
    } from "@/shared/ui/RangeFilter";
    import Link from "next/link";

    interface AccommodationsUnitFilterProps {
        accommodationId: string;
    }


    export function AccommodationsUnitFilter({accommodationId}:AccommodationsUnitFilterProps) {
        const [open, setOpen] = useState(false);
        const [capacityValue, setCapacityValue] = useState<number[]>([0, 10]);
        const [areaValue, setAreaValue] = useState<number[]>([0, 400]);

        const { filters, setFilter } = useAccommodationUnitFilter();

        const debouncedSearch = useDebounce((value: AccommodationUnitSearchCredientials) => {
            Object.entries(value).forEach(([key, value]) => {
                setFilter(key as keyof AccommodationUnitSearchCredientials, value);
            });
        }, 400);

        useEffect(() => {
            debouncedSearch({
                minCapacity: String(capacityValue[0]),
                maxCapacity: String(capacityValue[1]),
                minArea: String(areaValue[0]),
                maxArea: String(areaValue[1]),
            });
        }, [capacityValue, areaValue]);

        return (
            <section>
                <div className="flex justify-between mt-10 mb-5">
                    <FilterSearch
                        defaultValue={filters.name ?? ""}
                        onSearch={(value) => debouncedSearch({ name: value })}
                        onToggleFilters={() => setOpen((prev) => !prev)}
                    />

                   <Link href={`/manager/accommodations/${accommodationId}/unit/create`}>
                       <Button>
                           <PlusIcon />
                           Добавить номер
                       </Button>
                   </Link>
                </div>

                {open && (
                    <FilterSection>
                        <div className="flex items-center gap-13">
                            <label className="font-medium">Статус</label>
                            <Select onValueChange={(value) => debouncedSearch({ isAvailable: value })}>
                                <SelectTrigger id="status-select" className="bg-white w-[180px]">
                                    <SelectValue placeholder="Статус" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=" ">Все</SelectItem>
                                    <SelectItem value="true">Доступно</SelectItem>
                                    <SelectItem value="false">Занято</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <RangeFilter
                            label="Емкость"
                            value={capacityValue}
                            onChange={setCapacityValue}
                            min={0}
                            max={10}
                        />

                        <RangeFilter
                            label="Площадь"
                            value={areaValue}
                            onChange={setAreaValue}
                            min={0}
                            max={400}
                        />
                    </FilterSection>
                )}
            </section>
        );
    }
