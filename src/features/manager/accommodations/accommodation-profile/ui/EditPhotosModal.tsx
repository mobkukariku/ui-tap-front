"use client"
import {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogClose} from "@/shared/ui/dialog";
import {Button} from "@/shared/ui/button";
import {useUpdateAccommodationPhotos} from "@/features/manager/accommodations/accommodation-profile/model/api/useUpdateAccommodationPhotos";
import {updatePhotosSchema, UpdatePhotosFormData} from "@/features/manager/accommodations/accommodation-profile/model/schema";
import {ImageUploader} from "@/widgets/images-uploader/ui/ImageUploader";

interface EditPhotosModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    accommodationId: number;
    initialImageUrls?: string[];
}

export function EditPhotosModal({
    open,
    setOpen,
    accommodationId,
    initialImageUrls = [],
}: EditPhotosModalProps) {
    const {mutate, isPending} = useUpdateAccommodationPhotos();
    const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);

    const form = useForm<UpdatePhotosFormData>({
        resolver: zodResolver(updatePhotosSchema),
        defaultValues: {
            images: [],
        },
    });

    useEffect(() => {
        if (open) {
            setImagePreviews(initialImageUrls || []);
            form.reset({
                images: [],
            });
        }
    }, [initialImageUrls, open, form]);

    const handleImagesChange = useCallback((files: File[]) => {
        const currentImages = form.getValues("images") || [];
        const newImages = [...currentImages, ...files];

        form.setValue("images", newImages, {shouldValidate: true});

        // Создаем превью для новых изображений
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }, [form]);

    const handleImageRemove = useCallback((index: number) => {
        // Если индекс меньше количества начальных изображений, просто удаляем из превью
        // Если больше или равно - удаляем из загруженных файлов
        if (index < initialImageUrls.length) {
            // Удаляем из превью начальных изображений
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        } else {
            // Удаляем из загруженных файлов
            const currentImages = form.getValues("images");
            const fileIndex = index - initialImageUrls.length;
            const newImages = currentImages.filter((_, i) => i !== fileIndex);
            form.setValue("images", newImages, {shouldValidate: true});
            setImagePreviews((prev) => prev.filter((_, i) => i !== index));
        }
    }, [form, initialImageUrls.length]);

    const onSubmit = (data: UpdatePhotosFormData) => {
        if (data.images.length === 0) {
            form.setError("images", {message: "Необходимо загрузить хотя бы одно изображение"});
            return;
        }

        mutate({
            id: accommodationId,
            images: data.images,
        }, {
            onSuccess: () => {
                setOpen(false);
                setImagePreviews([]);
                form.reset();
            }
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Редактировать фотографии</DialogTitle>
                </DialogHeader>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <ImageUploader
                        images={imagePreviews}
                        onImagesChange={handleImagesChange}
                        onImageRemove={handleImageRemove}
                        error={form.formState.errors.images?.message as string}
                        maxImages={10}
                        label="Изображения"
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary" disabled={isPending}>
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Сохранение..." : "Сохранить"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

