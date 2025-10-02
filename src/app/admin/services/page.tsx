import {ServicesTable} from "@/features/admin/manage-services/table-services/ui/ServicesTable";
import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {FilterPanel} from "@/widgets/services-filter-panel/ui/FilterPanel";

export default function AdminServicesPage() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Админ", href: "/admin" },
                    { label: "Услуги", href: "/admin/services" }
                ]}
            />
            <FilterPanel />
            <ServicesTable />
        </>
    );
}