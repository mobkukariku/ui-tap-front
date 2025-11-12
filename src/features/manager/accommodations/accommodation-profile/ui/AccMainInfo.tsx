import {DataField} from "@/features/manager/accommodations/accommodation-profile/ui/DataField";
import {Building, Building2, Captions, MapPin, ScrollText, Star} from "lucide-react";

interface AccMainInfoProps {
    name: string;
    description: string;
    address: string,
    cityName: string,
    districtName: string,
    rating: number,
}

export function AccMainInfo({name, description, address, cityName, districtName, rating}:AccMainInfoProps) {
    return (
        <div className={"flex flex-col mt-10 gap-2"}>
            <p className={"opacity-50"}>Основная информация</p>
            <div className={"bg-gray-100 flex px-7 py-5 flex-col gap-5 rounded-3xl border w-full h-fit"}>
                <DataField
                    icon={Captions}
                    label="Название"
                    value={name}
                />
                <DataField
                    icon={ScrollText}
                    label="Описание"
                    value={description}
                />
                <DataField
                    icon={MapPin}
                    label="Адрес"
                    value={address}
                />
                <div className={"flex flex-row w-full gap-3 items-center"}>
                    <DataField
                        icon={Building2}
                        label="Город"
                        value={cityName}
                    />
                    <DataField
                        icon={Building}
                        label="Округ"
                        value={districtName}
                    />
                </div>
                <DataField
                    icon={Star}
                    label="Рейтинг"
                    value={String(rating)}
                />
            </div>
        </div>
    )
}