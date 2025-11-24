import {api} from "@/shared/api/axiosInstance";

export const getMySearchRequests = async () => {
    const response = await api.get("/search-requests/my");

    return response.data;
}