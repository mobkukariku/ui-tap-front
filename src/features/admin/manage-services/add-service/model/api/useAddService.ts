
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {createService} from "@/features/admin/manage-services/add-service/model/api/api";
import {DictionaryCreateCredentials} from "@/features/admin/manage-services/add-service/model/types";

export function useAddService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data:DictionaryCreateCredentials) =>
            createService({
                key: "ACC_SERVICE",
                value: data.value
            })
        ,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_SERVICE"],
                exact: false
            });
        },
        onError: (error) => {
            return error.message;
        },
        onSettled: () => {
            console.log("onSettled");
        }
    })
}
