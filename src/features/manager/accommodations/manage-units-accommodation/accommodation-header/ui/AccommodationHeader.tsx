"use client"
import {SettingsIcon} from "lucide-react";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/useGetAccommodationById";
import {Badge} from "@/shared/ui/badge";
import Link from "next/link";

interface AccommodationHeaderProps {
    accommodationId: string
}

export function AccommodationHeader({accommodationId}: AccommodationHeaderProps) {

    const {data, isLoading, error} = useGetAccommodationById(accommodationId)

    if(isLoading) return <p>Loading...</p>

    if(error) return <p>{error.message}</p>

    return (
        <article>
            <section className={"p-6 flex flex-col gap-4"}>
                <header className={"flex items-center justify-between gap-4"}>
                    <div className={"flex flex-row gap-4 items-center"}>
                        <h1 className={"text-2xl font-semibold"}>{data?.name}</h1>
                        {
                            data?.approved ? (<Badge>Подтвержден</Badge>) : null
                        }
                    </div>
                    <Link href={`/manager/accommodations/${accommodationId}/profile`}>
                        <SettingsIcon className={"opacity-60"} width={20} />
                    </Link>
                </header>
            </section>
        </article>
    )
}