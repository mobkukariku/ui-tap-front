import {ServicesFilter} from "@/features/admin/manage-services/filter-services/ui/ServicesFIlter";
import {ServiceAdd} from "@/features/admin/manage-services/add-service/ui/ServiceAdd";

export function FilterPanel() {
    return (
        <section className={"my-5 flex justify-between"}>
            <ServicesFilter />
            <ServiceAdd />
        </section>
    )
}