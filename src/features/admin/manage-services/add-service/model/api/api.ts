import {api} from "@/shared/api/axiosInstance";

export const createService = async (data: DictionaryCreateRequest) => {
    const response = await api.post("/dictionaries", data);

    return response.data;
};