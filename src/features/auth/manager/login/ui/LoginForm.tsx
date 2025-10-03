"use client"
import {Label} from "@/shared/ui/label";
import {Input} from "@/shared/ui/input";
import {ManagerLoginFormData, managerLoginSchema} from "@/features/auth/manager/login/model/schema";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {redirect} from "next/navigation";
import {Button} from "@/shared/ui/button";

export function LoginForm() {
    const form = useForm<ManagerLoginFormData>({
        resolver: zodResolver(managerLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = (data: ManagerLoginFormData) => {
        console.log(data);
        toast.success("Успешный вход в систему.", {
            position: "top-right",
            richColors: true,
            description: getCurrentTime()
        });
        redirect('/manager');
    }
    return (
        <form className={"flex flex-col w-3/4 sm:w-100 gap-3"} onSubmit={form.handleSubmit(onSubmit)}>
            <fieldset className={"flex flex-col gap-2"}>
                <Label>Email</Label>
                <Input
                    type={"email"}
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
                <Label>Password</Label>
                <Input
                    key={"password"}
                    placeholder={"Email"}
                    {...form.register("password")}
                    className={form.formState.errors.password ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/30" : ""}
                    type={"password"}
                />
                {form.formState.errors.password && (
                    <p className="text-sm text-red-500">{form.formState.errors.password.message as string}</p>
                )}
            </fieldset>
            <fieldset className={"self-center mt-5"}>
                <Button className={"w-30"}>
                    Войти
                </Button>
            </fieldset>
        </form>
    )
}