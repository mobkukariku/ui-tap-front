"use client"
import {Building2, BuildingIcon, MapPin, SettingsIcon, Star} from "lucide-react";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/manage-units-accommodation/accommodation-header/model/api/useGetAccommodationById";
import {Label} from "@/shared/ui/label";
import {Badge} from "@/shared/ui/badge";

interface AccommodationHeaderProps {
    accommodationId: string
}

export function AccommodationHeader({accommodationId}: AccommodationHeaderProps) {

    const {data, isLoading, error} = useGetAccommodationById(accommodationId)

    if(isLoading) return <p>Loading...</p>

    if(error) return <p>{error.message}</p>

    return (
        <article>
            <header
                className={"w-full h-70 relative rounded-lg bg-cover bg-center"}
                style={{ backgroundImage: 'url(https://picsum.photos/200/300)' }}
                role="img"
                aria-label={`Изображение отеля ${data?.name}`}
            >
            </header>
            <section className={"p-6 flex flex-col gap-4"}>
                <header className={"flex items-center justify-between gap-4"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <h1 className={"text-2xl font-semibold"}>{data?.name}</h1>
                        {
                            data?.approved ? (<Badge>Подтвержден</Badge>) : null
                        }
                    </div>
                    <SettingsIcon className={"opacity-60"} width={20} />
                </header>
                <p className={"text-sm text-gray-600"}>
                    {data?.description}
                </p>
                <section className={"flex flex-col w-full border border-gray-300 gap-3 bg-gray-200 rounded-2xl p-4"}>
                    <div className={"flex flex-row w-full gap-4"}>
                        <section className={"flex flex-col w-full gap-2"}>
                            <Label className={"ml-2"}>Город</Label>
                            <address className={"flex border border-gray-300 bg-gray-100 rounded-xl p-2 flex-row gap-2 not-italic"}>
                                <Building2 width={20} className={"opacity-80"} aria-hidden="true" />
                                {data?.cityName}
                            </address>
                        </section>
                        <section className={"flex flex-col w-full gap-2"}>
                            <Label className={"ml-2"}>округ</Label>
                            <address className={"flex border border-gray-300 bg-gray-100 rounded-xl p-2 flex-row gap-2 not-italic"}>
                                <BuildingIcon width={20} className={"opacity-80"} aria-hidden="true" />
                                {data?.districtName}
                            </address>
                        </section>
                    </div>
                    <section className={"flex flex-col w-full gap-2"}>
                        <Label className={"ml-2"}>Адрес</Label>
                        <address className={"flex border border-gray-300 bg-gray-100 rounded-xl p-2 flex-row gap-2 not-italic"}>
                            <MapPin width={20} className={"opacity-80"} aria-hidden="true" />
                            {data?.address}
                        </address>
                    </section>
                    <section className={"flex flex-col w-full gap-2"}>
                        <Label className={"ml-2"}>Рейтинг</Label>
                        <div className={"flex border border-gray-300 bg-gray-100 rounded-xl p-2 flex-row gap-2"}>
                            <Star width={20} className={"opacity-80"} aria-hidden="true" />
                            {data?.rating}
                        </div>
                    </section>
                </section>
            </section>
        </article>
    )
}