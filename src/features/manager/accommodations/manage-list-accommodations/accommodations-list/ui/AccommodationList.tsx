import {accomodationList} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/model/constants";
import {AccommodationItem} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationItem";
import {
    AccommodationEmptyList
} from "@/features/manager/accommodations/manage-list-accommodations/accommodations-list/ui/AccommodationEmptyList";

export function AccommodationList() {

    if(accomodationList.length === 0) {
        return <AccommodationEmptyList />
    }

    return (
        <section className={"flex flex-row gap-3"}>
            {accomodationList.map(accommodation => (
                <AccommodationItem id={accommodation.id} name={accommodation.name} key={accommodation.id} imageURL={accommodation.imageURL}  />
            ))}
        </section>
    )
}