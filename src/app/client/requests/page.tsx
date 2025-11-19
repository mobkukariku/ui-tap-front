import {RequestsList} from "@/features/client/requests/client-my-list-requests/ui/RequestsList";
import {Container} from "@/shared/ui/container";


export default function RequestPage() {
    return (
        <Container>
            <section className="flex flex-col gap-10">
                <h1 className="text-3xl my-10 text-center font-bold">Мои заявки</h1>
                <RequestsList />
            </section>
        </Container>
    )
}