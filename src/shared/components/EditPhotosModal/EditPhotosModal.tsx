"use client"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/shared/ui/dialog";
import { Button } from "@/shared/ui/button";
import { ImageUploader } from "@/widgets/images-uploader/ui/ImageUploader";
import { UseFormReturn } from "react-hook-form";

interface EditPhotosModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    initialImageUrls?: string[];
    title?: string;
    maxImages?: number;
    usePhotosHook: (params: {
        open: boolean;
        setOpen: (open: boolean) => void;
        id: number;
        initialImageUrls: string[];
    }) => {
        form: UseFormReturn<any>;
        imagePreviews: string[];
        isUpdating: boolean;
        handleImagesChange: (files: File[]) => void;
        handleImageRemove: (index: number) => void;
        onSubmit: (data: any) => Promise<void>;
    };
    entityId: number;
}

export function EditPhotosModal({
                                    open,
                                    setOpen,
                                    initialImageUrls = [],
                                    title = "Редактировать фотографии",
                                    maxImages = 10,
                                    usePhotosHook,
                                    entityId,
                                }: EditPhotosModalProps) {
    const {
        form,
        imagePreviews,
        isUpdating,
        handleImagesChange,
        handleImageRemove,
        onSubmit,
    } = usePhotosHook({
        open,
        setOpen,
        id: entityId,
        initialImageUrls,
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <ImageUploader
                        images={imagePreviews}
                        onImagesChange={handleImagesChange}
                        onImageRemove={handleImageRemove}
                        error={form.formState.errors.images?.message as string}
                        maxImages={maxImages}
                        label="Изображения"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isUpdating}>
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isUpdating}>
                            {isUpdating ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}