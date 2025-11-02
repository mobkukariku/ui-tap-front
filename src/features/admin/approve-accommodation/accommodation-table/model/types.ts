import {PaginationParams} from "@/shared/types/params";

export interface AccommodationSearchCredentials extends PaginationParams {
    cityId?: number | null;
    districtId?: number | null;
    approved?: boolean | null;
    isDeleted?: boolean | null;
    minRating?: number | null;
    ownerId?: number | null;
    name?: string | null;
}