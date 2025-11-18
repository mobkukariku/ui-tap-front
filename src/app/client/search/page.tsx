import {Container} from "@/shared/ui/container";
import {ClientSearchHeader} from "@/features/client/client-search-header/ui/ClientSearchHeader";
import {ClientSearchInputs} from "@/features/client/client-search-input/ui/ClientSearchInputs";

export default function ClientPage() {
    return (
        <>
            <Container className={"py-10"}>
                <ClientSearchHeader />
                <ClientSearchInputs />
            </Container>
        </>
    )
}