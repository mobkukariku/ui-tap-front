"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { useGetAccommodationUnits } from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnits";
import { AccommodationUnit } from "@/entities/accommodation-unit/model/types";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import InfoItem from "@/shared/ui/info-item";
import {
  Home,
  Users,
  Square,
  Layers,
  CheckCircle,
  XCircle,
  Wifi,
  Utensils,
  Sun,
  Wind,
  Tag,
  DollarSign,
  Package
} from "lucide-react";

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

export function AccommodationUnitList() {
  const { data, isLoading, isError } = useGetAccommodationUnits();
  const [page, setPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p className="text-center py-8">Загрузка...</p>;
  if (isError) return <p className="text-center py-8 text-red-500">Ошибка загрузки</p>;

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead>Описание</TableHead>
            <TableHead>Вместительность</TableHead>
            <TableHead>Площадь</TableHead>
            <TableHead>Этаж</TableHead>
            <TableHead>Статус</TableHead>
            <TableHead className="text-center">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.content.map((item: AccommodationUnit) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="max-w-xs truncate" title={item.description}>
                {item.description || "—"}
              </TableCell>
              <TableCell>{item.capacity}</TableCell>
              <TableCell>{item.area} м²</TableCell>
              <TableCell>{item.floor}</TableCell>
              <TableCell>
                {item.isAvailable ? (
                  <Badge className="bg-green-50 text-green-700">Доступно</Badge>
                ) : (
                  <Badge variant="destructive">Занято</Badge>
                )}
              </TableCell>
              <TableCell className="text-center">
                <Button size="sm" onClick={openModal}>
                  Посмотреть
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.totalElements > 20 && (
        <div className="mt-6">
          <TablePagination
            page={page}
            totalPages={data.totalPages}
            size={10}
            onPageChange={setPage}
          />
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Home className="w-6 h-6 text-primary" />
                {mockUnit.name}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-6 space-y-6">
              <InfoItem icon={Layers} label="Тип номера">
                <p className="text-base">
                  {mockUnit.unitType === "APARTMENT"
                    ? "Апартаменты"
                    : mockUnit.unitType === "HOTEL_ROOM"
                    ? "Номер в отеле"
                    : "Другое"}
                </p>
              </InfoItem>

              <InfoItem icon={Tag} label="Описание">
                <p className="text-base text-gray-700 leading-relaxed">
                  {mockUnit.description}
                </p>
              </InfoItem>

              <InfoItem icon={Users} label="Вместимость">
                <p className="text-base">{mockUnit.capacity} чел.</p>
              </InfoItem>

              <InfoItem icon={Square} label="Площадь">
                <p className="text-base">{mockUnit.area} м²</p>
              </InfoItem>

              <InfoItem icon={Layers} label="Этаж">
                <p className="text-base">{mockUnit.floor} этаж</p>
              </InfoItem>

              <InfoItem icon={mockUnit.isAvailable ? CheckCircle : XCircle} label="Статус">
                <Badge
                  className={
                    mockUnit.isAvailable
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }
                >
                  {mockUnit.isAvailable ? "Доступно" : "Занято"}
                </Badge>
              </InfoItem>

              <InfoItem icon={Package} label="Услуги">
                <div className="flex flex-wrap gap-2">
                  {mockUnit.services.map((service, i) => {
                    const Icon = serviceIcons[service] || Tag;
                    return (
                      <Badge key={i} variant="secondary" className="flex items-center gap-1">
                        <Icon className="w-3 h-3" />
                        {service === "WI_FI"
                          ? "Wi-Fi"
                          : service === "KITCHEN"
                          ? "Кухня"
                          : service === "BALCONY"
                          ? "Балкон"
                          : service === "AIR_CONDITIONING"
                          ? "Кондиционер"
                          : service}
                      </Badge>
                    );
                  })}
                </div>
              </InfoItem>

              <InfoItem icon={Tag} label="Условия">
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {mockUnit.conditions.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </InfoItem>

              <InfoItem icon={DollarSign} label="Тарифы">
                <div className="space-y-2">
                  {mockUnit.tariffs.map((t, i) => (
                    <div key={i} className="flex justify-between text-sm">
                      <span className="font-medium">{t.name}</span>
                      <span className="text-muted-foreground">
                        {t.price.toLocaleString()} ₸ / ночь
                      </span>
                    </div>
                  ))}
                </div>
              </InfoItem>
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}