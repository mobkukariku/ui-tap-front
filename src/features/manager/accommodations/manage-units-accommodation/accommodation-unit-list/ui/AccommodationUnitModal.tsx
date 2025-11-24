import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/shared/ui/dialog";
import {
    CheckCircle,
    Home,
    Layers,
    Package,
    Square,
    Tag,
    Users,
    XCircle
} from "lucide-react";
import InfoItem from "@/shared/ui/info-item";
import {Badge} from "@/shared/ui/badge";
import {
    useGetAccommodationUnitById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnitById";
import {Dictionary} from "@/entities/dictionary/model/types";
import {ImageGallery} from "@/shared/ui/image-gallery";

interface AccommodationUnitModalProps {
    id: string;
    isModalOpen: boolean;
    setIsModalOpen: (isOpen: boolean) => void;
}



export function AccommodationUnitModal({id, isModalOpen, setIsModalOpen}:AccommodationUnitModalProps) {

    const {data} = useGetAccommodationUnitById(id, isModalOpen);

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent className="w-[95vw] sm:w-full max-w-2xl break-all max-h-[90vh] overflow-y-auto p-4 sm:p-6">
                <>
                    <DialogHeader>
                        <DialogTitle className="text-xl sm:text-2xl font-bold flex items-center gap-2">
                            <Home className="w-5 h-5 sm:w-6 sm:h-6 text-primary flex-shrink-0" />
                            <span className="break-words">{data?.name}</span>
                        </DialogTitle>
                    </DialogHeader>

                    {data?.imageUrls ? <ImageGallery images={data?.imageUrls} /> : null}

                    <div className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
                        <InfoItem icon={Layers} label="Тип номера">
                            <p className="text-sm sm:text-base">
                                {data?.unitType === "APARTMENT"
                                    ? "Апартаменты"
                                    : data?.unitType === "HOTEL_ROOM"
                                        ? "Номер в отеле"
                                        : "Другое"}
                            </p>
                        </InfoItem>

                        <InfoItem icon={Tag} label="Описание">
                            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">
                                {data?.description}
                            </p>
                        </InfoItem>

                        <InfoItem icon={Users} label="Вместимость">
                            <p className="text-sm sm:text-base">{data?.capacity} чел.</p>
                        </InfoItem>

                        <InfoItem icon={Square} label="Площадь">
                            <p className="text-sm sm:text-base">{data?.area} м²</p>
                        </InfoItem>

                        <InfoItem icon={Layers} label="Этаж">
                            <p className="text-sm sm:text-base">{data?.floor} этаж</p>
                        </InfoItem>

                        <InfoItem icon={data?.isAvailable ? CheckCircle : XCircle} label="Статус">
                            <Badge
                                className={
                                    data?.isAvailable
                                        ? "bg-green-50 text-green-700 text-xs sm:text-sm"
                                        : "bg-red-100 border-red-400 text-red-700 text-xs sm:text-sm"
                                }
                            >
                                {data?.isAvailable ? "Доступно" : "Занято"}
                            </Badge>
                        </InfoItem>

                        <InfoItem icon={Package} label="Услуги">
                            <div className="flex flex-wrap gap-2">
                                {data?.services.map((service:Dictionary) => {
                                    return (
                                        <Badge key={service.id} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
                                            {service.value}
                                        </Badge>
                                    );
                                })}
                            </div>
                        </InfoItem>

                        <InfoItem icon={Package} label="Условия">
                            <div className="flex flex-wrap gap-2">
                                {data?.conditions.map((condition:Dictionary) => {
                                    return (
                                        <Badge key={condition.id} variant="secondary" className="flex items-center gap-1 text-xs sm:text-sm">
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