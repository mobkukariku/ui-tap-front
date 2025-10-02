export interface Accommodation {
    id: string;
    cityId: string;
    districtId: string;
    address: string;
    name: string;
    description: string;
    rating: number;
    approved?: boolean;
    approvedBy?: string;
    ownerId: string;
}

export interface District {
    id: string;
    cityId: string;
    name: string;
}


export interface City {
    id: string;
    name: string;
}

export interface AccImages {
    id: string;
    accId: string;
    imageUrl: string;
}

export interface AccDocuments {
    id: string;
    accId: string;
    documentUrl: string;
    documentType: string;
}

export interface AccDictionary {
    id: string;
    accId: string;
    dictionaryId: string;
}

export interface AccConfig {
    id: string;
    accId: string;
    dictionaryId: string;
    configValue: string;
}