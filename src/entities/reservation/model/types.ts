export interface Reservation {
    id: number;
    clientId: number;
    clientName: string;
    accommodationUnitId: number;
    accommodationUnitName: string;
    accommodationName: string;
    priceRequestId: number;
    searchRequestId: number;
    price: number;
    status: ReservationStatus;
    needToPay: boolean;
    createdAt: string;
    updatedAt: string;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
}



export enum ReservationStatus {
    SUCCESSFUL = 'Успешно',
    WAITING_TO_APPROVE = 'Ожидает подтверждения',
    APPROVED = 'Подтверждено',
    REJECTED = 'Отклонено',
    CLIENT_DIDNT_CAME = 'Клиент не пришёл',
}