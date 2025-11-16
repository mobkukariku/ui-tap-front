import {useMutation} from "@tanstack/react-query";
import {RegisterCredentials} from "@/features/auth/register/manager/model/types";
import {managerRegisterApi} from "@/features/auth/register/manager/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

export function useManagerRegister() {
    return useMutation({
        mutationFn: (data: RegisterCredentials) => managerRegisterApi.register(data),
        onSuccess: (response) => {
            localStorage.setItem("accessToken", response?.data?.accessToken);

            toast.success("Успешный вход в систему.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: (error) => {
            toast.error("Ошибка входа в систему", {
                position: "top-right",
                richColors: true,
                description: error.message || "Проверьте данные и попробуйте снова"
            })
        },
        onSettled: () => {
            console.log("settled");
        },
    })
}