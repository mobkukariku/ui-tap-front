export interface Dictionary {
    id: number;
    name: string;
    value: string;
}

export interface DictionaryCredentials {
    isDeleted: boolean;
    keys: string[] | null;
    values: string | null;
    page: number;
    size: number;
}

export interface DictionaryResponse {
    content: Dictionary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    last: boolean;
}