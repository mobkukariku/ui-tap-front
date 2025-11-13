"use client"
import {AccMainInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccMainInfo";
import {AccDictionariesInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccDictionariesInfo";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/useGetAccommodationById";
import {ImageGallery} from "@/shared/ui/image-gallery";

interface AccommodationProfileProps {
    accommodationId: string
}

export function AccommodationProfile({accommodationId}:AccommodationProfileProps) {

    const {data, isLoading, error} = useGetAccommodationById(accommodationId);

    if(isLoading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    return (
        <div className={"flex flex-col mx-auto w-200 mt-20"}>
            <div className={"flex flex-row mx-auto gap-5"}>
                <ImageGallery images={data?.imageUrls} />
            </div>
            <AccMainInfo
                name={data?.name}
                description={data?.description}
                address={data?.address}
                cityName={data?.cityName}
                districtName={data?.districtName}
                rating={data?.rating}
            />
            <AccDictionariesInfo
                services={data?.services}
                conditions={data?.conditions}
            />
        </div>
    )
}