import {api} from "@/shared/api/axiosInstance";

export const getRelevantRequests = async (id:number) => {
    const response = await api.get(`/accommodations/${id}/relevant-requests`);
    return response.data;
}