import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {FilterPanel} from "@/widgets/conditions-filter-panel/ui/FilterPanel";
import {ConditionTable} from "@/features/admin/manage-conditions/condition-table/ui/ConditionTable";

export default function AdminConditionsPage() {
    return <>
        <BreadcrumbLayout
            items={[
                { label: "Админ", href: "/admin" },
                { label: "Условия", href: "/admin/conditions" }
            ]}
        />
        <FilterPanel />
        <ConditionTable />
    </>;
}