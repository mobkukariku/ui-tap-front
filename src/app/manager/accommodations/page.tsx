import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {AccommodationList} from "@/features/manager/manage-list-accommodations/accommodations-list/ui/AccommodationList";
import {
    ManagerAccommodationFilterPanel
} from "@/features/manager/manage-list-accommodations/accommodations-filter/ui/ManagerAccommodationFilterPanel";

export default function ManagerAccommodationsPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Менеджер", href: "/manager" },
                    { label: "Accommodations", href: "/manager/accommodations" }
                ]}
            />
            <ManagerAccommodationFilterPanel />
            <AccommodationList />
        </>
    )
}