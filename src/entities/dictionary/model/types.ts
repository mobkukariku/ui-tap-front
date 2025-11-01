export interface Dictionary {
    id?: string;
    key: string;
    value: string;
}

export interface DictionaryCredentials {
    isDeleted: boolean;
    keys: string[] | null;
    value: string | null;
    page: number;
    size: number;
}


export interface DictionaryResponse {
    content: Dictionary[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}