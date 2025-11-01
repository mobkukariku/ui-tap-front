"use client"
import { Input } from "@/shared/ui/input";
import {useForm,} from "react-hook-form";
import {DialogClose, DialogFooter, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import {Label} from "@/shared/ui/label";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {AddConditionFormData, addConditionSchema} from "@/features/admin/manage-conditions/add-condition/model/schema";
import {useAddCondition} from "@/features/admin/manage-conditions/add-condition/model/api/useAddCondition";
import {AxiosError} from "axios";


interface Props {
    setOpen: (open: boolean) => void;
}

export function ConditionAddFormFields({setOpen}:Props) {
    const {mutate} = useAddCondition();
    const form = useForm<AddConditionFormData>({
        resolver: zodResolver(addConditionSchema),
        defaultValues: { value: "" },
    });

    const onSubmit = (data: AddConditionFormData) => {
        try{
            mutate(data.value);
            setOpen(false);
            toast.success("Условие было создано.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        }catch (error){
            if(error instanceof AxiosError){
                toast.error("Ошибка создания сервиса", {
                    position: "top-right",
                    richColors: true,
                    description:
                        error.response?.data?.message ||
                        "Проверьте данные и попробуйте снова",
                });
            }
        }
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>

            <DialogHeader>
                <DialogTitle>Добавить условие</DialogTitle>
            </DialogHeader>
            <div className="flex items-center my-5 gap-2">
                <div className="flex flex-col w-full gap-4">
                    <div className={"flex gap-2 flex-col"}>
                        <Label htmlFor={"value"}>Значение</Label>
                        <Input
                            id="value"
                            placeholder="Значение"
                            {...form.register("value")}
                        />
                        {form.formState.errors.value && (
                            <p className="text-sm text-red-500">{form.formState.errors.value.message as string}</p>
                        )}
                    </div>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">
                        Close
                    </Button>
                </DialogClose>
                <Button type="submit" >Сохранить</Button>
            </DialogFooter>
        </form>
    );
}
