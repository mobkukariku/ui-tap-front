import {Dialog, DialogContent} from "@/shared/ui/dialog";

interface SuccessfulRequestSendModalProps {
    setOpen: (open: boolean) => void;
    open: boolean;
}

export function SuccessfulRequestSendModal({setOpen, open}:SuccessfulRequestSendModalProps) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                asdasdasdasd
            </DialogContent>
        </Dialog>
    )
}