import {BreadcrumbLayout} from "@/widgets/breadcrumbs/ui/BreadcrumbLayout";
import {RequestTable} from "@/features/manager/requests/request-table/ui/RequestTable";
import {RequestSearchInput} from "@/features/manager/requests/filter-request/ui/RequestSearchInput";

interface Props {
    params: {id: string}
}

export default async function RequestsByAccommodationPage({params}:Props) {
    const {id} = await params;

    return (
        <>
            <BreadcrumbLayout
                items={[
                    { label: "Главная", href: "/manager" },
                    { label: "Заявки по Accommodation", href: "/manager/requests" },
                    { label: id, href: `/manager/requests/${id}` }
                ]}
            />
            {/*<RequestSearchInput />*/}
            <RequestTable id={Number(id)} />
        </>
    )
}