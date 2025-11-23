import {api} from "@/shared/api/axiosInstance";

export const getReservationById = async (id:number) => {
    const response = await api.get(`/reservations/${id}`);

    return response.data;
};