import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {
    CheckCircle,
    DollarSign,
    Home,
    Layers,
    Package,
    Square, Sun,
    Tag,
    Users,
    Utensils,
    Wifi, Wind,
    XCircle
} from "lucide-react";
import InfoItem from "@/shared/ui/info-item";
import {Badge} from "@/shared/ui/badge";
import {
    useGetAccommodationUnitById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnitById";

interface AccommodationUnitModalProps {
    id: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}

const mockUnit = {
    name: "Солнечная студия №7",
    unitType: "APARTMENT",
    description: "Уютная студия с панорамным видом на горы. Включает кухню, Wi-Fi, кондиционер и балкон. Идеально для пары или одного гостя.",
    capacity: 2,
    area: 38.5,
    floor: 5,
    isAvailable: true,
    services: ["WI_FI", "KITCHEN", "BALCONY", "AIR_CONDITIONING"],
    conditions: ["Заезд после 14:00", "Выезд до 12:00", "Курение запрещено", "Домашние животные не допускаются"],
    tariffs: [
        { name: "Стандарт", price: 25000 },
        { name: "Ночь с завтраком", price: 32000 },
    ],
};

const serviceIcons: Record<string, React.ElementType> = {
    WI_FI: Wifi,
    KITCHEN: Utensils,
    BALCONY: Sun,
    AIR_CONDITIONING: Wind,
};

export function AccommodationUnitModal({id, isModalOpen, setIsModalOpen}:AccommodationUnitModalProps) {

    const {data} = useGetAccommodationUnitById(id);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="max-w-2xl break-all max-h-[90vh] overflow-y-auto">
                <>
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <Home className="w-6 h-6 text-primary" />
                            {data?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="mt-6 space-y-6">
                        <InfoItem icon={Layers} label="Тип номера">
                            <p className="text-base">
                                {data?.unitType === "APARTMENT"
                                    ? "Апартаменты"
                                    : data?.unitType === "HOTEL_ROOM"
                                        ? "Номер в отеле"
                                        : "Другое"}
                            </p>
                        </InfoItem>

                        <InfoItem icon={Tag} label="Описание">
                            <p className="text-base text-gray-700 leading-relaxed">
                                {data?.description}
                            </p>
                        </InfoItem>

                        <InfoItem icon={Users} label="Вместимость">
                            <p className="text-base">{data?.capacity} чел.</p>
                        </InfoItem>

                        <InfoItem icon={Square} label="Площадь">
                            <p className="text-base">{data?.area} м²</p>
                        </InfoItem>

                        <InfoItem icon={Layers} label="Этаж">
                            <p className="text-base">{data?.floor} этаж</p>
                        </InfoItem>

                        <InfoItem icon={data?.isAvailable ? CheckCircle : XCircle} label="Статус">
                            <Badge
                                className={
                                    data?.isAvailable
                                        ? "bg-green-50 text-green-700"
                                        : "bg-red-50 text-red-700"
                                }
                            >
                                {data?.isAvailable ? "Доступно" : "Занято"}
                            </Badge>
                        </InfoItem>

                        <InfoItem icon={Package} label="Услуги">
                            <div className="flex flex-wrap gap-2">
                                {data?.services.map((service, i) => {
                                    return (
                                        <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                            {service.value}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </InfoItem>

                        <InfoItem icon={Package} label="Условия">
                            <div className="flex flex-wrap gap-2">
                                {data?.conditions.map((condition, i) => {
                                    return (
                                        <Badge key={i} variant="secondary" className="flex items-center gap-1">
                                            {condition.value}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </InfoItem>

                      {/*  <InfoItem icon={DollarSign} label="Тарифы">*/}
                      {/*      <div className="space-y-2">*/}
                      {/*          {mockUnit.tariffs.map((t, i) => (*/}
                      {/*              <div key={i} className="flex justify-between text-sm">*/}
                      {/*                  <span className="font-medium">{t.name}</span>*/}
                      {/*                  <span className="text-muted-foreground">*/}
                      {/*  {t.price.toLocaleString()} ₸ / ночь*/}
                      {/*</span>*/}
                      {/*              </div>*/}
                      {/*          ))}*/}
                      {/*      </div>*/}
                      {/*  </InfoItem>*/}
                    </div>
                </>
            </DialogContent>
        </Dialog>
    )
}