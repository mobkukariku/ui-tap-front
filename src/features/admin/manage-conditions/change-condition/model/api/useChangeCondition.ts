import {useMutation, useQueryClient} from "@tanstack/react-query";
import {changeCondition} from "@/features/admin/manage-conditions/change-condition/model/api/api";
import {ChangeConditionCredentials} from "@/features/admin/manage-conditions/change-condition/model/types";



export function useChangeCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ChangeConditionCredentials) => changeCondition(data),
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            })
        },
        onError: (error) => {
            return error.message;
        },
        onSettled: () => {
            console.log("onSettled");
        },
    })

}