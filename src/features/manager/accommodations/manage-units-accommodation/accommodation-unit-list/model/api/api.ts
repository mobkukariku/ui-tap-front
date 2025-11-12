import {
    AccommodationUnitSearchCredientials
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/types";
import {api} from "@/shared/api/axiosInstance";

export const getAccommodationUnits = async (data: AccommodationUnitSearchCredientials) => {
    const response = await api.get("/accommodation-units/search", {
        params: {
            accommodationId: data.accommodationId ?? "",
            unitTypeId: data.unitTypeId ?? "",
            isAvailable: data.isAvailable ?? "",
            isDeleted: data.isDeleted ?? "",
            name: data.name ?? "",
            minCapacity: data.minCapacity ?? "",
            maxCapacity: data.maxCapacity ?? "",
            minArea: data.minArea ?? "",
            maxArea: data.maxArea ?? "",
            page: data.page ?? 0,
            size: data.size ?? 20,
        }
    });

    return response.data;
};