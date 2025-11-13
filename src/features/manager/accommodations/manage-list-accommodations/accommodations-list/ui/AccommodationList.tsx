"use client"
import {accomodationList} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/constants";
import {AccommodationItem} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationItem";
import {
    AccommodationEmptyList
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationEmptyList";
import {
    useGetMyAccommodations
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/api/useGetMyAccommodations";
import {Spinner} from "@/shared/ui/spinner";

export function AccommodationList() {

    const {data: accommodations, isLoading, isError} = useGetMyAccommodations();

    if(accomodationList.length === 0) {
        return <AccommodationEmptyList />
    }

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />

    if(isError) return <p>Error</p>



    return (
        <section className={"flex flex-wrap max-md:justify-center flex-row gap-3"}>
            {accommodations?.content?.map(accommodation => (
                <AccommodationItem id={accommodation.id} name={accommodation.name} key={accommodation.id} imageURL={"https://picsum.photos/200/300"}  />
            ))}
        </section>
    )
}