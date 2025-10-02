import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {
    AccommodationTable
} from "@/features/admin/approve-accommodation/accommodation-table/ui/AccommodationTable";
import {FilterPanel} from "@/widgets/accommodations-filter-panel/ui/FilterPanel";

export default function AdminAccommodationsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
              { label: "Админ", href: "/admin" },
              { label: "Accommodations", href: "/admin/accommodations" }
            ]}
        />
          <FilterPanel />
          <AccommodationTable />
      </>
  );
}