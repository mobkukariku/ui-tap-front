"use client"
import {AccMainInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccMainInfo";
import {AccDictionariesInfo} from "@/features/manager/accommodations/accommodation-profile/ui/AccDictionariesInfo";
import {
    useGetAccommodationById
} from "@/features/manager/accommodations/accommodation-profile/model/api/useGetAccommodationById";

interface AccommodationProfileProps {
    accommodationId: string
}

export function AccommodationProfile({accommodationId}:AccommodationProfileProps) {

    const {data, isLoading, error} = useGetAccommodationById(accommodationId);

    if(isLoading) return <p>Loading...</p>

    if (error) return <p>{error.message}</p>

    return (
        <div className={"flex flex-col mx-auto w-200 mt-20"}>
            <div className={"flex flex-row gap-5"}>
                <div className={"bg-gray-200 w-50 h-50 rounded-2xl"}></div>
                <div className={"flex break-all   flex-col mt-5 gap-2"}>
                    <h4 className={"text-2xl font-bold"}>{data?.name}</h4>
                    <p className={""}>{data?.description}</p>
                </div>
            </div>
            <AccMainInfo
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