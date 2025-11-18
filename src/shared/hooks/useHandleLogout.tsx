"use client";
import { toast } from "sonner";
import { AxiosError } from "axios";
import {useLogOut} from "@/features/auth/logout/model/api/useLogOut";

export function useHandleLogout() {
    const logOut = useLogOut();

    const handleLogout = async () => {
        try {
            await logOut.mutateAsync();
            window.location.href = "/";
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error("Ошибка выхода из системы", {
                    position: "top-right",
                    richColors: true,
                    description:
                        error.response?.data?.message ||
                        "Произошла ошибка. Попробуйте снова.",
                });
            } else {
                toast.error("Неизвестная ошибка при выходе");
            }
        }
    };

    return { handleLogout, logOut };
}
