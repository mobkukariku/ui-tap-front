import {DictionaryField} from "@/features/manager/accommodations/accommodation-profile/ui/DataField";
import {Pencil} from "lucide-react";
import {Button} from "@/shared/ui/button";

interface AccDictionariesInfoProps {
    services: string[],
    conditions: string[],
    onEdit?: () => void;
}

export function AccDictionariesInfo({services, conditions, onEdit}: AccDictionariesInfoProps) {
    return (
        <div className={"flex flex-col mt-10 gap-2"}>
            <div className="flex flex-row items-center justify-between">
                <p className={"opacity-50"}>Теги</p>
                {onEdit && (
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onEdit}
                        className="h-8 w-8"
                        aria-label="Редактировать теги"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <div className={"bg-gray-100 flex px-7 py-5 flex-col gap-5 rounded-3xl border w-full h-fit"}>
                <DictionaryField label={"Услуги"} values={services}  />
                <DictionaryField label={"Условия"} values={conditions} />
            </div>
        </div>
    )
}