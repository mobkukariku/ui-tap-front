import {AccommodationSearchInput} from "@/features/admin/approve-accommodation/filter-accommodation/ui/AccommodationSearchInput";

export function FilterPanel() {
    return (
        <section className={"my-5 flex justify-between"}>
            <AccommodationSearchInput />
        </section>
    )
}