import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";

export default function AdminAccommodationsPage() {
  return (
      <>
        <BreadcrumbLayout
            items={[
              { label: "Админ", href: "/admin" },
              { label: "Accommondations", href: "/admin/accommodations" }
            ]}
        />
      </>
  );
}