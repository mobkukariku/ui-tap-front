// src/features/auth/manager/register/ui/SuccessfulRequestSendModal.tsx
import {Dialog, DialogContent, DialogTitle} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {CircleCheck} from "lucide-react";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";

interface SuccessfulRequestSendModalProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}

export function SuccessfulRequestSendModal({setOpen, open}: SuccessfulRequestSendModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <VisuallyHidden>
                <DialogTitle>Заявка успешно отправлена</DialogTitle>
            </VisuallyHidden>

            <DialogContent className={"flex flex-col py-10 items-center justify-center"}>
                <CircleCheck width={80} height={80} className="text-primary" />
                <p className={"font-medium text-xl"}>Заявка успешно отправлена</p>
                <div className="flex justify-end mt-4">
                    <Button onClick={() => setOpen(false)}>Закрыть</Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}