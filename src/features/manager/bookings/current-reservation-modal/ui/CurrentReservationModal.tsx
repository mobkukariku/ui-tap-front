import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { Separator } from "@/shared/ui/separator";
import { CalendarIcon, UsersIcon, DollarSignIcon, UserIcon } from "lucide-react";
import {Reservation, ReservationStatus} from "@/entities/reservation/model/types";
import {ReservationStatusUi} from "@/features/manager/bookings/current-reservation-modal/ui/ReservationStatusUi";
import {
    ChangeReservationStatus
} from "@/features/manager/bookings/current-reservation-modal/ui/ChangeReservationStatus";



interface CurrentReservationModalProps {
    reservation?: Reservation;
}

export function CurrentReservationModal({ reservation }: CurrentReservationModalProps) {
    const mockData: Reservation = reservation || {
        id: 23,
        clientId: 101,
        clientName: "Иван Петров",
        accommodationUnitId: 5,
        accommodationUnitName: "Номер Люкс (201)",
        accommodationName: "Апартаменты у моря",
        priceRequestId: 1001,
        searchRequestId: 2001,
        price: 49000,
        status: ReservationStatus.CLIENT_DIDNT_CAME,
        needToPay: false,
        createdAt: "2024-12-18T10:30:00Z",
        updatedAt: "2024-12-20T14:15:00Z",
        checkInDate: "2025-01-15",
        checkOutDate: "2025-01-22",
        guestCount: 2,
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm">Подробнее</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md md:w-full w-[90%] max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between gap-4">
                    <DialogTitle className="text-lg font-semibold">
                        Бронирование №{mockData.id}
                    </DialogTitle>
                </div>


                <ReservationStatusUi status={mockData.status} />


                <Separator className="my-2" />


                <div className="space-y-4">
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Размещение
                        </p>
                        <p className="text-sm font-medium mt-1">{mockData.accommodationName}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                            Юнит
                        </p>
                        <p className="text-sm font-medium mt-1">{mockData.accommodationUnitName}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                Заезд
                            </p>
                            <p className="text-sm font-medium mt-1">{mockData.checkInDate}</p>
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
                                <CalendarIcon className="w-3.5 h-3.5" />
                                Выезд
                            </p>
                            <p className="text-sm font-medium mt-1">{mockData.checkOutDate}</p>
                        </div>
                    </div>

                    <div className="flex w-full gap-4 pt-2">
                        <div className="bg-muted/50 border w-full rounded-lg p-3">
                            <p className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                                <UsersIcon className="w-3.5 h-3.5" />
                                Гостей
                            </p>
                            <p className="text-lg font-bold mt-1">{mockData.guestCount}</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Информация о клиенте
                    </p>

                    <div className="space-y-2.5">
                        <div className="flex items-center gap-3">
                            <UserIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                            <div>
                                <p className="text-xs text-muted-foreground">Имя</p>
                                <p className="text-sm font-medium">{mockData.clientName}</p>
                            </div>
                        </div>

                    </div>
                </div>

                <Separator className="my-4" />

                <div className="bg-primary/5 rounded-lg p-4 border border-primary/10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <DollarSignIcon className="w-5 h-5 text-primary" />
                            <span className="text-sm font-medium text-muted-foreground">
                                Итоговая сумма
                            </span>
                        </div>
                        <p className="text-lg font-bold text-primary">
                            {mockData.price.toLocaleString("ru-RU")} Тг
                        </p>
                    </div>
                </div>

                <div className="flex gap-2 pt-4">
                    <ChangeReservationStatus />
                </div>
            </DialogContent>
        </Dialog>
    );
}