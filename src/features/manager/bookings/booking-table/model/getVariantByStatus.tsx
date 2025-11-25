import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { ReservationStatus } from "@/entities/reservation/model/types";
import {
    CurrentReservationModal
} from "@/features/manager/bookings/current-reservation-modal/ui/CurrentReservationModal";

type BadgeVariant = "default" | "destructive" | "outline" | "waiting";

interface ReservationStatusConfig {
    badge: {
        label: string;
        variant: BadgeVariant;
    };
    actions: React.ReactNode;
}

const RESERVATION_STATUS_CONFIG: Record<ReservationStatus, ReservationStatusConfig> = {
    SUCCESSFUL: {
        badge: {
            label: "Успешно",
            variant: "default",
        },
        actions: null,
    },
    WAITING_TO_APPROVE: {
        badge: {
            label: "Ждет подтверждения",
            variant: "waiting",
        },
        actions: (
            <>
                <Button size="sm">Подтвердить</Button>
                <Button size="sm" variant="outline">
                    Отмена
                </Button>
            </>
        ),
    },
    APPROVED: {
        badge: {
            label: "Подтверждено",
            variant: "outline",
        },
        actions: <CurrentReservationModal />
    },
    REJECTED: {
        badge: {
            label: "Отказ",
            variant: "destructive",
        },
        actions: null,
    },
    CLIENT_DIDNT_CAME: {
        badge: {
            label: "Клиент не пришел",
            variant: "destructive",
        },
        actions: <CurrentReservationModal />
    },
};

export const getBadgeVariant = (status: string): React.ReactNode => {
    const config = RESERVATION_STATUS_CONFIG[status];

    if (!config) {
        return <Badge>Неизвестный статус</Badge>;
    }

    return (
        <Badge variant={config.badge.variant}>
            {config.badge.label}
        </Badge>
    );
};

export const getButtonsVariant = (status: string): React.ReactNode => {
    const config = RESERVATION_STATUS_CONFIG[status];
    return config?.actions ?? null;
};