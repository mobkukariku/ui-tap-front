"use client"
import {Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {Input} from "@/shared/ui/input";
import {Label} from "@/shared/ui/label";
import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UpdatePriceFormData, updatePriceSchema} from "@/features/manager/requests/price-request/model/schema";
import {useUpdatePrice} from "@/features/manager/requests/price-request/model/api/useUpdatePrice";

interface UpdatePriceModalProps {
    curPrice: number;
}

export function UpdatePriceModal({curPrice}:UpdatePriceModalProps) {
    const [isOpen, setIsOpen] = useState(false);

    const form = useForm({
        resolver: zodResolver(updatePriceSchema),
        defaultValues: {
            price: curPrice ?? 0
        }
    })

    const {mutate} = useUpdatePrice();

    const onSubmit: SubmitHandler<UpdatePriceFormData> = (data: UpdatePriceFormData) => {
        try{
            mutate({
                price: data.price,
                searchRequestId: curPrice,
            })
            setIsOpen(false);
        }catch (err){
            console.log(err);
        }
    }



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Обновить цену</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Обновить цену</DialogTitle>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
                    <fieldset className="flex flex-col gap-2">
                        <Label>Цена</Label>
                        <Input {...form.register("price")} />
                    </fieldset>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant={"outline"}>Отмена</Button>
                        </DialogClose>
                        <Button>Сохранить</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}