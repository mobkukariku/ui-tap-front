import {api} from "@/shared/api/axiosInstance";
import {User} from "@/entities/user/model/types";

export const getMe = async (): Promise<User> => {
    const response = await api.get("/users/me");
    return response.data;
};

