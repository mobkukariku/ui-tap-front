import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";

export default function Admin() {
    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Админ", href: "/admin" }
                ]}
            />
        </>
    )
}
