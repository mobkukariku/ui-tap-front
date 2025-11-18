export interface SearchRequestCredientials {
    checkInDate: string,
    checkOutDate: string,
    oneNight?: boolean,
    price: number,
    countOfPeople: number,
    fromRating: number,
    toRating: number,
    unitTypes: string[]
    districtIds: string[],
    serviceDictionaryIds: string[],
    conditionDictionaryIds: string[]

}