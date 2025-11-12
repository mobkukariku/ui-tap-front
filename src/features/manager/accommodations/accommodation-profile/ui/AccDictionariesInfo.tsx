import {DictionaryField} from "@/features/manager/accommodations/accommodation-profile/ui/DataField";

interface AccDictionariesInfoProps {
    services: string[],
    conditions: string[],
}

export function AccDictionariesInfo({services, conditions}: AccDictionariesInfoProps) {
    return (
        <div className={"flex flex-col mt-10 gap-2"}>
            <p className={"opacity-50"}>Теги</p>
            <div className={"bg-gray-100 flex px-7 py-5 flex-col gap-5 rounded-3xl border w-full h-fit"}>
                <DictionaryField label={"Услуги"} values={services}  />
                <DictionaryField label={"Условия"} values={conditions} />

            </div>
        </div>
    )
}