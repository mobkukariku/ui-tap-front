import {
    CreateAccommodationUnitFormFields
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/ui/CreateAccommodationUnitFormFields";

interface CreateAccommodationUnitFormFields {
    accommodationId: string;
}

export function CreateAccommodationUnit({accommodationId}:CreateAccommodationUnitFormFields) {
    return (
        <section className={"max-w-2xl mx-auto mt-20"}>
            <h3 className={"text-2xl text-center font-medium"}>Введите данные юнита</h3>
            <CreateAccommodationUnitFormFields accommodationId={accommodationId} />
        </section>
    )
}