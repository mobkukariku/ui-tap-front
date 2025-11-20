import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/shared/ui/dialog";
import {
    CreatePriceRequestFormFields
} from "@/features/manager/requests/create-price-request/ui/CreatePriceRequestFormFields";
import {Button} from "@/shared/ui/button";

interface CreatePriceRequestProps {
    price?: number;
}

export function CreatePriceRequest({price}:CreatePriceRequestProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size={"sm"}>Откликнуться</Button>
            </DialogTrigger>
            <DialogContent >
                <DialogTitle>Создание заявки цены</DialogTitle>
                <CreatePriceRequestFormFields price={price} />
            </DialogContent>
        </Dialog>
    )
}