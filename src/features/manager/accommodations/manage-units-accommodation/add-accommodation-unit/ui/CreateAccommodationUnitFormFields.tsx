"use client"
import {
    useCreateAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/api/useCreateAccommodationUnit";
import {useDictionary} from "@/entities/dictionary/model/api/useDictionary";
import {SubmitHandler, useForm} from "react-hook-form";
import {
    CreateAccommodationUnitFormData, createAccommodationUnitSchema
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {Textarea} from "@/shared/ui/textarea";
import {useRouter} from "next/navigation";

export function CreateAccommodationUnitFormFields() {
    const {mutate} = useCreateAccommodationUnit();
    const {data: conditions} = useDictionary("ACC_CONDITIONS");
    const {data: services} = useDictionary("ACC_SERVICES");
    const router = useRouter();

    const form = useForm<CreateAccommodationUnitFormData>({
        resolver: zodResolver(createAccommodationUnitSchema),
        defaultValues: {}
    })


    const onSubmit:SubmitHandler<CreateAccommodationUnitFormData> = (data: CreateAccommodationUnitFormData) => {
        try{
            mutate(data);
            form.reset();
            router.push("/manager/accommodations");
        }catch (error){
            console.log(error);
        }
    }

    return (
        <form className={"my-20 flex flex-col mx-auto gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
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
        </form>
        )

}