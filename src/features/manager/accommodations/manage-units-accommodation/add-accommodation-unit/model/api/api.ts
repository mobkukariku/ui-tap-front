import {
    IAddAccommodationUnitForm
} from "@/features/manager/accommodations/manage-units-accommodation/add-accommodation-unit/model/types";
import {api} from "@/shared/api/axiosInstance";

export const createAccommodationUnit = async (data: IAddAccommodationUnitForm) => {
    const response = await api.post("/accommodation-units", data);

    return response.data;
};