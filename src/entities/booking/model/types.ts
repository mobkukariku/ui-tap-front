export enum ReservationStatus {
    SUCCESSFUL = 'Успешно',
    WAITING_TO_APPROVE = 'Ожидает подтверждения',
    APPROVED = 'Подтверждено',
    REJECTED = 'Отклонено',
    CLIENT_DIDNT_CAME = 'Клиент не пришёл',
    CANCELED_BY_CLIENT = 'Отменено',
}

export interface Reservation {
    id: number
    clientId: number
    fromRating?: number | null
    toRating?: number | null
    fromDate: string
    toDate: string
    price?: number | null
    status: ReservationStatus
}
