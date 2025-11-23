"use client"
import {useMySearchRequests} from "@/features/client/requests/client-my-list-requests/model/api/useMySearchRequests";
import {RequestInfo} from "@/features/client/requests/client-my-list-requests/ui/RequestInfo";
import {SearchRequest} from "@/entities/search-request/model/types";
import Link from "next/link";
import {Spinner} from "@/shared/ui/spinner";

export function RequestsList() {

    const {data, isError, isLoading} = useMySearchRequests();

    if(isError) return <p>Error</p>;

    if(isLoading) return <Spinner className={"w-full mx-auto size-7 my-10"} />




    return (
       <div className={"flex flex-col gap-6 sm:gap-8 md:gap-10"}>
           {data?.content?.map((request:SearchRequest) => (
               <Link key={request.id} href={`/client/requests/${request.id}`}>
                   <RequestInfo request={request} />
               </Link>
           ))}
       </div>
    );
}
