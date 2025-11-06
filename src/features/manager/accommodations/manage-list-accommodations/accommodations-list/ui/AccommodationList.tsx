"use client"
import {accomodationList} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/constants";
import {AccommodationItem} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationItem";
import {
    AccommodationEmptyList
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationEmptyList";
import {
    useGetMyAccommodations
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/api/useGetMyAccommodations";

export function AccommodationList() {

    const {data: accommodations} = useGetMyAccommodations();

    if(accomodationList.length === 0) {
        return <AccommodationEmptyList />
    }

    console.log(accommodations);


    return (
        <section className={"flex flex-row gap-3"}>
            {accommodations?.content?.map(accommodation => (
                <AccommodationItem id={accommodation.id} name={accommodation.name} key={accommodation.id} imageURL={"https://picsum.photos/200/300"}  />
            ))}
        </section>
    )
}