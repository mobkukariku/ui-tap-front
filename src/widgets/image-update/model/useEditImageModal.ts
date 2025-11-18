import {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {UpdateImageFormData, updateImageSchema} from "@/widgets/image-update/model/schema";
import {zodResolver} from "@hookform/resolvers/zod";

interface UseEditImageModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    id: number;
    initialImageUrls?: string[];
}

export function useEditImageModal({
                                      open,
                                      setOpen,
                                      id,
                                      initialImageUrls = []
                                  }: UseEditImageModalProps) {
    const [imagePreviews, setImagePreviews] = useState<string[]>(initialImageUrls);
    const [deletedUrls, setDeletedUrls] = useState<string[]>([]);

    const form = useForm<UpdateImageFormData>({
        resolver: zodResolver(updateImageSchema),
        defaultValues: {
            images: [],
        }
    });

    useEffect(() => {
        if(open){
            setImagePreviews(initialImageUrls || []);
            setDeletedUrls([]);
            form.reset({images: []});
        }
    }, [initialImageUrls, open, form]);

    const handleImagesChange = useCallback((files:File[])=> {
        const curImages = form.getValues("images") || [];
        const newImages = [...curImages, ...files];

        form.setValue("images", newImages, {shouldValidate:true});

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        })

    }, [form]);

    const handleImageRemove = useCallback((index: number) => {

    }, [form, initialImageUrls, imagePreviews, deletedUrls.length]);

}




















