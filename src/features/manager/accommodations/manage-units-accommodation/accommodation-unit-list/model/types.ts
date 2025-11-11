import {PaginationParams} from "@/shared/types/params";

export interface AccommodationUnitSearchCredientials extends PaginationParams {
    accommodationId?: string | null;
    unitTypeId?: string | null;
    isAvailable?: string | null;
    isDeleted?: string | null;
    name?: string | null;
    minCapacity?: string | null;
    maxCapacity?: string | null;
    minArea?: string | null;
    maxArea?: string | null;
}