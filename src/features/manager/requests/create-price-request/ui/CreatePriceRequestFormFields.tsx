
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {DialogClose, DialogFooter} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    CreatePriceRequestFormData,
    createPriceRequestSchema
} from "@/features/manager/requests/create-price-request/model/schema";
import {RequestAccUnitItem} from "@/features/manager/requests/create-price-request/ui/RequestAccUnitItem";
import {useEffect, useState} from "react";

interface CreatePriceRequestFormFieldsProps {
    price?: number;
    units?: Array<{
        unitId: string;
        name: string;
        capacity: number;
        description: string;
        area: number;
        floor: number;
        isAvailable: boolean;
    }>;
}

// mocks/units.ts
export const mockUnits = [
    {
        unitId: "1",
        name: "Люкс апартамент",
        capacity: 4,
        description: "Просторный апартамент с видом на город",
        area: 85,
        floor: 5,
        isAvailable: true,
    },
    {
        unitId: "2",
        name: "Стандартный номер",
        capacity: 2,
        description: "Уютный номер с двуспальной кроватью",
        area: 35,
        floor: 2,
        isAvailable: true,
    },
    {
        unitId: "3",
        name: "Семейный номер",
        capacity: 6,
        description: "Большой номер для семей с детьми, две спальни",
        area: 120,
        floor: 3,
        isAvailable: false,
    },
    {
        unitId: "4",
        name: "Студия",
        capacity: 1,
        description: "Компактная студия для одного гостя",
        area: 25,
        floor: 1,
        isAvailable: true,
    },
    {
        unitId: "5",
        name: "Премиум люкс",
        capacity: 5,
        description: "Элитный номер с джакузи и видом на парк",
        area: 150,
        floor: 8,
        isAvailable: true,
    },
    {
        unitId: "6",
        name: "Двухкомнатный апартамент",
        capacity: 4,
        description: "Апартамент с двумя спальнями и гостиной",
        area: 95,
        floor: 4,
        isAvailable: false,
    },
    {
        unitId: "7",
        name: "Эконом номер",
        capacity: 1,
        description: "Бюджетный вариант без излишеств",
        area: 20,
        floor: 1,
        isAvailable: true,
    },
    {
        unitId: "8",
        name: "Апартамент с балконом",
        capacity: 3,
        description: "Номер с балконом и кухней",
        area: 65,
        floor: 6,
        isAvailable: true,
    },
];

export function CreatePriceRequestFormFields({
                                                 price,
                                                 units = mockUnits
                                             }: CreatePriceRequestFormFieldsProps) {
    const [selectUnitId, setSelectUnitId] = useState<string | undefined>(undefined);

    const form = useForm({
        resolver: zodResolver(createPriceRequestSchema),
        defaultValues: {
            price: price ?? 0,
            unitId: undefined
        }
    })

    useEffect(() => {
        form.setValue("unitId", selectUnitId);
    }, [selectUnitId, form])

    const handleUnitSelect = (unitId: string) => {
        setSelectUnitId(prevId => prevId === unitId ? undefined : unitId);
    }

    const onSubmit: SubmitHandler<CreatePriceRequestFormData> = (data: CreatePriceRequestFormData) => {
        console.log(data);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex flex-col gap-4 w-full"}>

            <fieldset className={"flex flex-col gap-2"}>
                <Label htmlFor={"price"} className={"text-sm"}>Цена</Label>
                <Input
                    id={"price"}
                    {...form.register("price")}
                    type={"number"}
                    className={`${form.formState.errors.price && "border-red-500"}`}
                    placeholder={"0"}
                    min={0}
                />
                {form.formState.errors.price && (
                    <span className={"text-red-500 text-xs"}>{form.formState.errors.price.message}</span>
                )}
            </fieldset>

            <fieldset className={"flex flex-col gap-2 min-h-0"}>
                <Label htmlFor={"units"} className={"text-sm"}>Юниты</Label>
                <div
                    id={"units"}
                    role={"group"}
                    aria-label={"Выбор юнитов"}
                    className={"border border-gray-200 overflow-y-auto flex flex-col gap-3 rounded-lg py-3 px-3 bg-gray-50 max-h-64"}
                >
                    {units.length > 0 ? (
                        units.map((unit) => (
                            <button
                                key={unit.unitId}
                                type={"button"}
                                onClick={() => handleUnitSelect(unit.unitId)}
                                className={"text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"}
                                aria-pressed={selectUnitId === unit.unitId}
                                disabled={!unit.isAvailable}
                            >
                                <RequestAccUnitItem
                                    unitId={unit.unitId}
                                    name={unit.name}
                                    description={unit.description}
                                    area={unit.area}
                                    capacity={unit.capacity}
                                    floor={unit.floor}
                                    isAvailable={unit.isAvailable}
                                    isSelected={selectUnitId === unit.unitId}
                                />
                            </button>
                        ))
                    ) : (
                        <p className={"text-gray-500 text-sm text-center py-8"}>Нет доступных юнитов</p>
                    )}
                </div>
                {form.formState.errors.unitId && (
                    <span className={"text-red-500 text-xs"}>{form.formState.errors.unitId.message}</span>
                )}
            </fieldset>

            <DialogFooter className={"gap-2"}>
                <DialogClose asChild>
                    <Button variant={"outline"} size={"sm"}>Отмена</Button>
                </DialogClose>
                <Button
                    disabled={!selectUnitId}
                    type={"submit"}
                    size={"sm"}
                >
                    Создать
                </Button>
            </DialogFooter>
        </form>
    )
}
