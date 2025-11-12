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
import { useAccommodations } from "@/features/admin/approve-accommodation/accommodation-table/model/api/useAccommodations";
import { Accommodation } from "@/entities/accommodation/model/types";
import { TablePagination } from "@/widgets/pagination/ui/TablePagination";
import InfoItem from "@/shared/ui/info-item";
import { ImageGallery } from "@/shared/ui/image-gallery";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import {
  MapPin,
  Star,
  Home,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
  User,
} from "lucide-react";

export function AccommodationTable() {
  const [page, setPage] = useState(0);
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<Accommodation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data,
    isLoading,
    isError,
    approveAccommodation,
    rejectAccommodation,
    approving,
    rejecting,
  } = useAccommodations();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading services</p>;

  const openModal = (accommodation: Accommodation) => {
    setSelectedAccommodation(accommodation);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAccommodation(null);
  };

  const getStatusConfig = (approved: boolean | null) => {
    if (approved === true)
      return {
        label: "Одобрено",
        color: "text-green-600",
        bg: "bg-green-50",
        icon: CheckCircle,
      };
    if (approved === false)
      return {
        label: "Отменено",
        color: "text-red-600",
        bg: "bg-red-50",
        icon: XCircle,
      };
    return {
      label: "На рассмотрении",
      color: "text-amber-600",
      bg: "bg-amber-50",
      icon: Clock,
    };
  };

  const mockAccommodation = {
    id: 4,
    cityName: "Almaty",
    districtName: "Almaly",
    address: "ул. Абая, 15, кв. 42",
    name: "Nasvai kupi",
    description:
      "Ne kurite suka — здесь только качественный насвай, без табака, без вреда. Только традиции и вкус. Доставка по Алматы за 30 минут.",
    rating: 4.1,
    approved: null,
    imageUrls: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    ownerName: "Азамат Нурланов",
    createdAt: "2025-04-01T10:30:00Z",
  };

  return (
    <>
      <Table className={"w-full"}>
        <TableHeader className={"w-full"}>
          <TableRow>
            <TableHead>Название</TableHead>
            <TableHead className={"w-[500px]"}>Адрес</TableHead>
            <TableHead>Рейтинг</TableHead>
            <TableHead className={"text-right"}>Статус</TableHead>
            <TableHead className="w-[300px] text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className={"w-full"}>
          {data?.content.map((item: Accommodation) => (
            <TableRow
              key={item.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => openModal(item)}
            >
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.rating}</TableCell>
              <TableCell className={"text-right"}>
                {item.approved === true ? (
                  <Badge>Одобрено</Badge>
                ) : item.approved === false ? (
                  <Badge variant="destructive">Отменено</Badge>
                ) : (
                  <Badge variant="waiting">На рассмотрении</Badge>
                )}
              </TableCell>
              <TableCell
                className={"text-right"}
                onClick={(e) => e.stopPropagation()}
              >
                {item.approved === null ? (
                  <menu className={"flex justify-end gap-2"}>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        approveAccommodation(item.id);
                      }}
                      size={"sm"}
                      disabled={approving}
                    >
                      Подтвердить
                    </Button>
                    <Button
                      size={"sm"}
                      variant="outline"
                      disabled={rejecting}
                      onClick={(e) => {
                        e.stopPropagation();
                        rejectAccommodation(item.id);
                      }}
                    >
                      Отмена
                    </Button>
                  </menu>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {data?.totalElements > 20 && (
        <TablePagination
          page={page}
          totalPages={data.totalPages}
          size={10}
          onPageChange={setPage}
        />
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                <Home className="w-7 h-7 text-primary" />
                {mockAccommodation.name}
              </DialogTitle>
            </DialogHeader>

            <ImageGallery images={mockAccommodation.imageUrls} />

            <div className="mt-6 space-y-6">
              <InfoItem icon={MapPin} label="Адрес">
                <p className="text-base">
                  {mockAccommodation.address}, {mockAccommodation.districtName},{" "}
                  {mockAccommodation.cityName}
                </p>
              </InfoItem>

              <InfoItem icon={FileText} label="Описание">
                <p className="text-base text-gray-700 leading-relaxed">
                  {mockAccommodation.description}
                </p>
              </InfoItem>

              <InfoItem icon={Star} label="Рейтинг">
                <div className="flex items-center gap-2">
                  <div className="relative flex">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-gray-300" />
                      ))}
                    </div>
                    <div
                      className="absolute inset-0 flex overflow-hidden"
                      style={{
                        width: `${(mockAccommodation.rating / 5) * 100}%`,
                      }}
                    >
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-5 h-5 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <span className="text-lg font-semibold">
                    {mockAccommodation.rating.toFixed(1)} / 5.0
                  </span>
                </div>
              </InfoItem>

              <InfoItem icon={User} label="Владелец">
                <p className="text-base">{mockAccommodation.ownerName}</p>
              </InfoItem>
            </div>
          </>
        </DialogContent>
      </Dialog>
    </>
  );
}
