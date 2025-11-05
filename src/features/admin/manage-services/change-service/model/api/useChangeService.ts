import {useMutation, useQueryClient} from "@tanstack/react-query";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";
import {changeService} from "@/features/admin/manage-services/change-service/model/api/api";
import {ChangeServiceCredentials} from "@/features/admin/manage-services/change-service/model/types";



export function useChangeService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeServiceCredentials) => changeService(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
            toast.success("Услуга была изменена.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            })
        },
        onError: (error) => {
            toast.error("Ошибка изменении услуги", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });
            return error.message;
        },
        onSettled: () => {
            console.log("onSettled");
        },
    })

}