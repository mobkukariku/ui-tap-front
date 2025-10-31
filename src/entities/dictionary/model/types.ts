export interface Dictionary {
    id: number;
    name: string;
    value: string;
}

export interface DictionaryCredentials {
    isDeleted: boolean;
    keys: string[];
    values: string;
}

export interface DictionaryResponse {
    content: Dictionary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}