import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {
  RequestSearchInput
} from "@/features/manager/requests/filter-request/ui/RequestSearchInput";
import {RequestTable} from "@/features/manager/requests/request-table/ui/RequestTable";

export default function ManagerRequestsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
                { label: "Менеджер", href: "/manager" },
              { label: "Заявки", href: "/manager/requests" }
            ]}
        />
          <RequestSearchInput />
          <RequestTable />
      </>
  );
}
