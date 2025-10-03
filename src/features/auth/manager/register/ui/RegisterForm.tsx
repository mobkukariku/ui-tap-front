"use client"
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {useForm} from "react-hook-form";
import {ManagerRegisterFormData, managerRegisterSchema} from "@/features/auth/manager/register/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {SuccessfulRequestSendModal} from "@/features/auth/manager/register/ui/SuccessfulRequestSendModal";
import {Button} from "@/shared/ui/button";

export function RegisterForm() {
    const [open, setOpen] = useState(false);
    const form = useForm<ManagerRegisterFormData>({
        resolver: zodResolver(managerRegisterSchema),
        defaultValues: {
            email: "",
            name: "",
            password: "",
            confirm_password: ""
        }
    });

    const onSubmit = (data: ManagerRegisterFormData) => {
        console.log(data);
        setOpen(true);
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className={"flex mt-5 flex-col w-3/4 sm:w-100 gap-5"}>
            <fieldset className={"flex flex-col gap-2"}>
                <Label>Email</Label>
                <Input
                    key={"email"}
                    placeholder={"Email"}
                    {...form.register("email")}
                    className={form.formState.errors.email ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                />
                {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message as string}</p>
                )}
            </fieldset>
            <fieldset className={"flex flex-col gap-2"}>
                <Label>Имя</Label>
                <Input
                    key={"name"}
                    placeholder={"Введите имя"}
                    {...form.register("name")}
                    className={form.formState.errors.name ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}

                />
                {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message as string}</p>
                )}
            </fieldset>
            <fieldset className={"flex flex-col gap-2"}>
                <Label>Пароль</Label>
                <Input
                    key={"password"}
                    placeholder={"Введите пароль"}
                    {...form.register("password")}
                    className={form.formState.errors.name ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}

                />
            </fieldset>
            <fieldset className={"flex flex-col gap-2"}>
                <Label>Подтвердите пароль</Label>
                <Input
                    key={"confirm_password"}
                    placeholder={"Введите пароль повторно"}
                    {...form.register("confirm_password")}
                />
            </fieldset>
            <fieldset className={"self-center mt-5"}>
                <Button className={"px-2 md:px-5"}>Зарегистрироваться</Button>
            </fieldset>
            <SuccessfulRequestSendModal setOpen={setOpen} open={open} />
        </form>
    )
}