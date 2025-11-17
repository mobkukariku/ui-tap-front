"use client"
import {Button} from "@/shared/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/shared/ui/dropdown-menu";
import {ChevronDown, Pencil} from "lucide-react";
import {useState} from "react";
import {
    AccommodationUnitModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/AccommodationUnitModal";
import {
    useGetAccommodationUnitById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/model/api/useGetAccommodationUnitById";
import {
    EditUnitMainInfoModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitMainInfoModal";
import {
    EditUnitDictionariesModal
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-unit-list/ui/EditUnitDictionariesModal";
import {Dictionary} from "@/entities/dictionary/model/types";

interface UnitEventButtonsProps {
    unitId: string;
}

export function UnitEventButtons({unitId}:UnitEventButtonsProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMainInfoOpen, setIsEditMainInfoOpen] = useState(false);
    const [isEditDictionariesOpen, setIsEditDictionariesOpen] = useState(false);

    const isModalsopen = isEditMainInfoOpen || isEditDictionariesOpen

    const { data: editUnitData } = useGetAccommodationUnitById(unitId, isModalsopen);

    return (
        <>
            <div className="flex gap-2 justify-center">
                <Button size="sm" onClick={() => {
                    setIsModalOpen(true);
                }}>
                    Посмотреть
                </Button>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            size="sm"
                            variant="outline"
                        >
                            <Pencil className="h-4 w-4 mr-1" />
                            Изменить
                            <ChevronDown className="h-4 w-4 ml-1" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => {
                            setIsEditMainInfoOpen(true);
                        }}>
                            Основная информация
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                            setIsEditDictionariesOpen(true);
                        }}>
                            Словари
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>


            <AccommodationUnitModal id={unitId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <EditUnitMainInfoModal
                open={isEditMainInfoOpen}
                setOpen={setIsEditMainInfoOpen}
                unitId={unitId}
                initialData={{
                    unitType: editUnitData?.unitType || "",
                    name: editUnitData?.name || "",
                    description: editUnitData?.description || "",
                    capacity: editUnitData?.capacity || 0,
                    area: editUnitData?.area || 0,
                    floor: editUnitData?.floor || 0,
                    isAvailable: editUnitData?.isAvailable ?? true,
                }}
            />
            <EditUnitDictionariesModal
                open={isEditDictionariesOpen}
                setOpen={setIsEditDictionariesOpen}
                unitId={unitId}
                initialServiceIds={editUnitData?.services?.map((s: Dictionary) => Number(s.id)) || []}
                initialConditionIds={editUnitData?.conditions?.map((c: Dictionary) => Number(c.id)) || []}
            />
        </>
    )
}