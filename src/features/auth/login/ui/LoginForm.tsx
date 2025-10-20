"use client"
import {useForm} from "react-hook-form";
import {AdminLoginFormData, adminLoginSchema} from "@/features/auth/login/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {Input} from "@/shared/ui/input";
import {Label} from "@/shared/ui/label";
import {Button} from "@/shared/ui/button";
import {useLogin} from "@/features/auth/login/model/api/useLogin";
import {AxiosError} from "axios";
import {ErrorResponse} from "@/shared/types";
import {useAuth} from "@/entities/session/model/useAuth";
import {useRouter} from "next/navigation";

export function LoginForm() {
    const login = useLogin();
    const { isAuthenticated, user } = useAuth();
    const router = useRouter()

    const form = useForm<AdminLoginFormData>({
        resolver: zodResolver(adminLoginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmit = async (data: AdminLoginFormData) => {
        try {
            await login.mutateAsync(data);

            toast.success("Успешный вход в систему.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });


            if (isAuthenticated && user) {
                if (user.role.includes("SUPER_MANAGER")) {
                    router.push("/manager");
                } else if (user.role.includes("ADMIN")) {
                    router.push("/admin");
                } else {
                    router.push("/");
                }
            }

        } catch (error) {
            if (error instanceof Error) {
                const axiosError = error as AxiosError<ErrorResponse>;
                toast.error("Ошибка входа в систему", {
                    position: "top-right",
                    richColors: true,
                    description: axiosError.response?.data?.message || "Проверьте данные и попробуйте снова"
                });
            }
        }
    }

    return (
        <form className="flex flex-col w-3/4 md:w-100 mx-auto gap-3" onSubmit={form.handleSubmit(onSubmit)}>
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
