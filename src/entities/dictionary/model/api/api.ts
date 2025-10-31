import { api } from "@/shared/api/axiosInstance";
import { DictionaryCredentials } from "@/entities/dictionary/model/types";

export const getDictionaries = async (data: DictionaryCredentials) => {
    return await api.get("/dictionaries/search", {
        params: {
            isDeleted: data.isDeleted ?? false,
            keys: data.keys?.length ? data.keys : "ACC_SERVICES",
            value: data.values ?? "null",
        },
    });
};
