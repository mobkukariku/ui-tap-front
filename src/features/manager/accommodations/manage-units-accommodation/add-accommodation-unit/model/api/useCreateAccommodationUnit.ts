import {useMutation} from "@tanstack/react-query";
import {
    IAddAccommodationUnitForm
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/types";
import {
    createAccommodationUnit
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/api/api";
import {toast} from "sonner";
import {getCurrentTime} from "@/shared/lib/date/getCurrentTime";

export function useCreateAccommodationUnit() {


    return useMutation({
        mutationFn: (data: IAddAccommodationUnitForm) => createAccommodationUnit(data),
        onSuccess: async () => {
            toast.success("Юнит был создан.", {
                position: "top-right",
                richColors: true,
                description: getCurrentTime()
            });
        },
        onError: async (error) => {
            toast.error("Ошибка создания юнита.", {
                position: "top-right",
                richColors: true,
                description:
                    error.message ||
                    "Проверьте данные и попробуйте снова",
            });
            return error.message;
        }
    })
}