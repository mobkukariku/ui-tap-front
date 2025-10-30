import {Reservation, ReservationStatus} from "@/entities/booking/model/types";

export const data: Reservation[] = [
    {
        id: 1,
        clientId: 101,
        fromDate: "2025-01-01",
        toDate: "2025-01-07",
        price: 20000,
        status: ReservationStatus.APPROVED,
        fromRating: 4,
        toRating: 5
    },
    {
        id: 2,
        clientId: 102,
        fromDate: "2025-01-10",
        toDate: "2025-01-15",
        price: 28000,
        status: ReservationStatus.WAITING_TO_APPROVE,
        fromRating: 3,
        toRating: 5
    },
    {
        id: 3,
        clientId: 103,
        fromDate: "2025-02-01",
        toDate: "2025-02-10",
        price: 40000,
        status: ReservationStatus.CANCELED_BY_CLIENT,
        fromRating: 4,
        toRating: 5
    },
    {
        id: 4,
        clientId: 104,
        fromDate: "2025-02-15",
        toDate: "2025-02-20",
        price: 25000,
        status: ReservationStatus.APPROVED,
        fromRating: 3,
        toRating: 4
    },
    {
        id: 5,
        clientId: 105,
        fromDate: "2024-12-25",
        toDate: "2025-01-05",
        price: 0,
        status: ReservationStatus.APPROVED,
        fromRating: 2,
        toRating: 5
    },
];
