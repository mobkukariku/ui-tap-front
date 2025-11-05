import {
    CreateAccommodationFormFields
} from "@/features/manager/accommodations/create-accommodation/ui/CreateAccommodationFormFields";

export function CreateAccommodation() {
    return (
        <section className={"max-w-2xl mx-auto mt-20"}>
            <h3 className={"text-2xl text-center font-medium"}>Введите данные</h3>
            <CreateAccommodationFormFields />
        </section>
    )
}