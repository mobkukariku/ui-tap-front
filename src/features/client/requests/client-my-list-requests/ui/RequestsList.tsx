"use client"
import {useMySearchRequests} from "@/features/client/requests/client-my-list-requests/model/api/useMySearchRequests";
import {RequestInfo} from "@/features/client/requests/client-my-list-requests/ui/RequestInfo";
import {SearchRequest} from "@/entities/search-request/model/types";
import {Spinner} from "@/shared/ui/spinner";
import {RequestItemLink} from "@/features/client/requests/client-my-list-requests/ui/RequestItemLink";

export function RequestsList() {

    const {data, isError, isLoading} = useMySearchRequests();

    if(isError) return <p>Error</p>;

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />

    return (
       <div className={"flex flex-col gap-6 sm:gap-8 md:gap-10"}>
           {data?.content?.map((request:SearchRequest) => (
               <RequestItemLink key={request.id} requestId={request.id}>
                   <RequestInfo request={request} />
               </RequestItemLink>
           ))}
       </div>
    );
}
