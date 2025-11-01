import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ConditionDictionaryCreateCredentials} from "@/features/admin/manage-conditions/add-condition/model/types";
import {createCondition} from "@/features/admin/manage-conditions/add-condition/model/api/api";

export function useAddCondition() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (value: string) =>
            createCondition({
                key: "ACC_CONDITION",
                value: value
            })
        ,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ["dictionary", "ACC_CONDITION"],
                exact: false
            });
        },
        onError: (error) => {
            return error.message;
        },
        onSettled: () => {
            console.log("onSettled");
        },
    })
}