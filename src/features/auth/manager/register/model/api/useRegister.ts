import {useMutation} from "@tanstack/react-query";
import {RegisterCredentials} from "@/features/auth/manager/register/model/types";
import {managerRegisterApi} from "@/features/auth/manager/register/model/api/api";

export function useRegister() {
    return useMutation({
        mutationFn: (data: RegisterCredentials) => managerRegisterApi.register(data),
        onSuccess: (response) => {
            localStorage.setItem("accessToken", response.data.accessToken);
            localStorage.setItem("refreshToken", response.data.refreshToken);
        },
        onError: (error) => {
            console.log(error.message);
        },
        onSettled: () => {
            console.log("settled");
        },
    })
}