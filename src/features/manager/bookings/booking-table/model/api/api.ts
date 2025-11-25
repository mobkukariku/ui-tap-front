import {api} from "@/shared/api/axiosInstance";

export const getReservationsByAccommodation = async (accId:number) => {
    const response = await api.get(`/reservations/by-accommodation/${accId}`);

    return response.data;
}

export const changeReservationStatus = async (reservationId:number, status:string) => {
    const response = await api.put(`/reservations/${reservationId}/status`, {status});

    return response.data;
}