import {RegisterCredentials} from "@/features/auth/manager/register/model/types";
import {api} from "@/shared/api/axiosInstance";

export const managerRegisterApi = {
    register: (data: RegisterCredentials) => (
        api.post("/auth/manager/register", data)
    )
}