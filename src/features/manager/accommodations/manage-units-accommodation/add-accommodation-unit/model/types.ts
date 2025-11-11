
export interface IAddAccommodationUnitForm {
    accommodationId: number,
    unitType: string;
    name: string;
    description: string;
    capacity: number;
    floor: number;
    area: number;
    serviceDictionaryIds: number[],
    conditionDictionaryIds: number[],
}