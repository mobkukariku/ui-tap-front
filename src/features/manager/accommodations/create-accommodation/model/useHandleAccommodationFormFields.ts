import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
    CreateAccommodationFormData,
    createAccommodationSchema
} from "@/features/manager/accommodations/create-accommodation/model/schema";
import { useCreateAccommodation } from "@/features/manager/accommodations/create-accommodation/model/api/useCreateAccommodation";
import { useGetCities } from "@/entities/city/model/api/useGetCities";
import { useGetDistricts } from "@/entities/district/model/api/useGetDistricts";

export function useHandleAccommodationFormFields() {
    const { mutate } = useCreateAccommodation();
    const { data: cities } = useGetCities();
    const router = useRouter();
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const form = useForm<CreateAccommodationFormData>({
        resolver: zodResolver(createAccommodationSchema),
        defaultValues: {
            name: "",
            description: "",
            address: "",
            cityId: "",
            districtId: "",
            rating: 0,
            images: [],
            serviceDictionaryIds: [],
            conditionDictionaryIds: [],
        },
    });

    const selectedCityId = form.watch("cityId");
    const { data: districts } = useGetDistricts(
        selectedCityId ? Number(selectedCityId) : null
    );

    const handleImagesChange = useCallback((files: File[]) => {
        const currentImages = form.getValues("images") || [];
        const newImages = [...currentImages, ...files];

        form.setValue("images", newImages, { shouldValidate: true });

        // Создаем превью для новых изображений
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews((prev) => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        });
    }, [form]);

    const removeImage = useCallback((index: number) => {
        const currentImages = form.getValues("images");
        const newImages = currentImages.filter((_, i) => i !== index);
        form.setValue("images", newImages, { shouldValidate: true });

        setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    }, [form]);

    const onSubmit = (data: CreateAccommodationFormData) => {
        try {
            mutate(data);
            form.reset();
            setImagePreviews([]);
            router.push("/manager/accommodations");
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = () => {
        history.back();
    };

    return {
        form,
        cities,
        districts,
        imagePreviews,
        handleImagesChange,
        removeImage,
        onSubmit,
        handleCancel,
    };
}