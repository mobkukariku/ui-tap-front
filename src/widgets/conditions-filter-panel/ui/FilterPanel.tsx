import {ConditionFilter} from "@/features/admin/manage-conditions/filter-condition/ui/ConditionFIlter";
import {ConditionAdd} from "@/features/admin/manage-conditions/add-condition/ui/ConditionAdd";

export function FilterPanel() {
    return (
        <section className={"my-5 flex justify-between"}>
            <ConditionFilter />
            <ConditionAdd />
        </section>
    )
}