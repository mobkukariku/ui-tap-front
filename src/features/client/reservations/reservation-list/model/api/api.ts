import {api} from "@/shared/api/axiosInstance";

export const getMyReservations = async () => {
    const response = await api.get("/reservations/my");

    return response.data;
};