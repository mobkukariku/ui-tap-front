"use client";

import { useLogin } from "@/features/auth/login/model/api/useLogin";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getCurrentTime } from "@/shared/lib/date/getCurrentTime";
import { AxiosError } from "axios";
import {sessionService} from "@/entities/session/model/sessionService";
import {LoginCredentials} from "@/features/auth/login/model/types";

export function useHandleLogin() {
    const login = useLogin();
    const router = useRouter();

    const handleLogin = async (data: LoginCredentials) => {
        try {
            await login.mutateAsync(data);

            toast.success("Успешный вход в систему.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime(),
            });

            const token = sessionService.getToken();
            const user = sessionService.getUserFromToken(token ?? "");

            if (user?.role.includes("SUPER_MANAGER")) {
                router.push("/manager");
            } else if (user?.role.includes("ADMIN")) {
                router.push("/admin");
            }else if (user?.role.includes("CLIENT")) {
                router.push("/client");
            } else {
                router.push("/");
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("Ошибка входа в систему", {
                    position: "top-right",
                    richColors: true,
                    description:
                        error.response?.data?.message ||
                        "Проверьте данные и попробуйте снова",
                });
            }
        }
    };

    return { handleLogin, login };
}
