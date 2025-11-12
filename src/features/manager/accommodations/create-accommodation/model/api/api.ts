import {CreateAccommodationRequest} from "@/features/manager/accommodations/create-accommodation/model/types";
import {api} from "@/shared/api/axiosInstance";

export const createAccommodation = async (data:CreateAccommodationRequest) => {
    const response = await api.post("/accommodations", data);

    return response.data;
}