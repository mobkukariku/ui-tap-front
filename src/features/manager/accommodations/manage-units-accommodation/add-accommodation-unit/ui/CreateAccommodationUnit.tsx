import {
    CreateAccommodationUnitFormFields
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/ui/CreateAccommodationUnitFormFields";

export function CreateAccommodationUnit() {
    return (
        <section className={"max-w-2xl mx-auto mt-20"}>
            <h3 className={"text-2xl text-center font-medium"}>Введите данные юнита</h3>
            <CreateAccommodationUnitFormFields />
        </section>
    )
}