import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {
    AccommodationHeader
} from "@/features/manager/manage-units-accommodation/accommodation-header/ui/AccommodationHeader";
import {
    AccommodationsUnitFilter
} from "@/features/manager/manage-units-accommodation/accommodation-unit-filter/ui/AccommodationsUnitFilter";
import {
    AccommodationUnitList
} from "@/features/manager/manage-units-accommodation/accommodation-unit-list/ui/AccommodationUnitList";

interface AccomodationPageProps {
    params: {
        id: string;
    }
}

export default async function AccomodationPage({ params }: AccomodationPageProps) {
    const { id } = await params;


    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" },
                    { label: id, href: `/manager/accommodations/${id}`}
                ]}
            />
            <AccommodationHeader />
            <AccommodationsUnitFilter />
            <AccommodationUnitList />
        </>
    )
}