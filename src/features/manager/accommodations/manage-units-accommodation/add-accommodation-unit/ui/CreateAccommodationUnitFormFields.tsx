"use client"
import {
    useCreateAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/api/useCreateAccommodationUnit";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {
    CreateAccommodationUnitFormData, createAccommodationUnitSchema
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {useRouter} from "next/navigation";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/shared/ui/select";
import {unitTypes} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/constants";
import {Button} from "@/shared/ui/button";
import {
    SelectDictionary
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/ui/SelectDictionary";

interface Props {
    accommodationId: string;
}

export function CreateAccommodationUnitFormFields({accommodationId}:Props) {
    const {mutate} = useCreateAccommodationUnit();
    const router = useRouter();

    const form = useForm<CreateAccommodationUnitFormData>({
        resolver: zodResolver(createAccommodationUnitSchema),
        defaultValues: {
            unitType: "",
            name: "",
            description: "",
            capacity: 0,
            area: 0,
            floor: 0,
            serviceDictionaryIds: [],
            conditionDictionaryIds: [],
        },
    });


    const onSubmit: SubmitHandler<CreateAccommodationUnitFormData> = async (data) => {
        console.log("data", data);
        try {
            const payload = { accommodationId, ...data };
            await mutate(payload);
            form.reset();
            router.push("/manager/accommodations");
        } catch (error) {
            console.error(error);
        }
    };

    const onError = (errors: any) => {
        console.log("form errors:", errors);
    };

    return (
        <form className={"my-20 flex flex-col mx-auto gap-5"} onSubmit={form.handleSubmit(onSubmit, onError)}>
            <fieldset className="flex flex-col gap-2">
                <Label>Имя</Label>
                <Input
                    placeholder="Имя"
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Описание</Label>
                <Textarea
                    placeholder="Описание"
                    {...form.register("description")}
                    className={form.formState.errors.description ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.description && (
                    <p className="text-sm text-red-500">{form.formState.errors.description.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Кол-во людей могут жить</Label>
                <Input
                    placeholder="Количество"
                    {...form.register("capacity", { valueAsNumber: true })}
                    className={form.formState.errors.capacity ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.capacity && (
                    <p className="text-sm text-red-500">{form.formState.errors.capacity.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Площадь</Label>
                <Input
                    placeholder="Площадь"
                    {...form.register("area", { valueAsNumber: true })}
                    className={form.formState.errors.area ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.area && (
                    <p className="text-sm text-red-500">{form.formState.errors.area.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Этаж</Label>
                <Input
                    placeholder="Этаж"
                    {...form.register("floor", { valueAsNumber: true })}
                    className={form.formState.errors.floor ? "border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.floor && (
                    <p className="text-sm text-red-500">{form.formState.errors.floor.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Тип юнита</Label>
                <Controller
                    name="unitType"
                    control={form.control}
                    render={({ field }) => (
                        <Select
                            onValueChange={field.onChange}
                            value={field.value}
                        >
                            <SelectTrigger className={`w-full ${form.formState.errors.unitType ? "border-red-500 focus-visible:ring-red-500/30" : ""}`}>
                                <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {unitTypes?.map((item) => (
                                        <SelectItem value={String(item.key)} key={item.key}>
                                            {item.value}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    )}
                />
                {form.formState.errors.unitType && (
                    <p className="text-sm text-red-500">{form.formState.errors.unitType.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Услуги</Label>
                <Controller
                    name="serviceDictionaryIds"
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary
                            value={field.value || []}
                            onChange={field.onChange}
                            placeholder="Выберите услуги"
                            type="ACC_SERVICE"
                        />
                    )}
                />
                {form.formState.errors.serviceDictionaryIds && (
                    <p className="text-sm text-red-500">{form.formState.errors.serviceDictionaryIds.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-col gap-2">
                <Label>Условия</Label>
                <Controller
                    name={"conditionDictionaryIds"}
                    control={form.control}
                    render={({ field }) => (
                        <SelectDictionary value={field.value || []} onChange={field.onChange} placeholder={"Выберите условия"} type={"ACC_CONDITION"} />
                    )}
                 />
                {form.formState.errors.conditionDictionaryIds && (
                    <p className="text-sm text-red-500">{form.formState.errors.conditionDictionaryIds.message as string}</p>
                )}
            </fieldset>
            <fieldset className="flex flex-row self-center gap-2">
                <Button type={"submit"}>Создать</Button>
                <Button onClick={() => history.back()} variant={"outline"}>Отмена</Button>
            </fieldset>
        </form>
        )

}