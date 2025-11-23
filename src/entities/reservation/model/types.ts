interface Reservation {
    id: number;
    clientId: number;
    clientName: string;
    accommodationUnitId: number;
    accommodationUnitName: string;
    accommodationName: string;
    priceRequestId: number;
    searchRequestId: number;
    price: number;
    status: "APPROVED" | "PENDING" | "REJECTED" | "CANCELLED";
    needToPay: boolean;
    createdAt: string;
    updatedAt: string;
    checkInDate: string;
    checkOutDate: string;
    guestCount: number;
}
