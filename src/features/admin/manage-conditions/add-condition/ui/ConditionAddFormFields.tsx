"use client"
import { Input } from "@/shared/ui/input";
import {useForm,} from "react-hook-form";
import {DialogClose, DialogFooter, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {Label} from "@/shared/ui/label";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";


interface Props {
    setOpen: (open: boolean) => void;
}

const schema = z.object({
    key: z.string().min(1, "Обязательное поле"),
    value: z.string().min(1, "Обязательное поле"),
});

type FormData = z.infer<typeof schema>;

export function ConditionAddFormFields({setOpen}:Props) {

    const form = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { key: "", value: "" },
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
        setOpen(false);
        toast.success("Условие было создано.", {
            position: "top-right",
            richColors: true,
            description: getCurrentTime()
        })
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>

            <DialogHeader>
                <DialogTitle>Добавить условие</DialogTitle>
            </DialogHeader>
            <div className="flex items-center my-5 gap-2">
                <div className="flex flex-col w-full gap-4">
                    <div className={"flex gap-2 flex-col"}>
                        <Label htmlFor={"key"}>Ключ</Label>
                        <Input
                            id="key"
                            placeholder="Ключ"
                            {...form.register("key")}
                        />
                        {form.formState.errors.key && (
                            <p className="text-sm text-red-500">{form.formState.errors.key.message as string}</p>
                        )}
                    </div>
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
