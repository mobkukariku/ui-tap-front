import {CurrentRequestInfo} from "@/features/client/requests/client-by-request/request-by-id/ui/CurrentRequestInfo";

interface CurrentRequestPageProps {
    params: {id: string}
}

export default async function CurrentRequestPage({params}:CurrentRequestPageProps) {
    const {id} = await params;



    return (
        <CurrentRequestInfo requestId={id} />
    )
}