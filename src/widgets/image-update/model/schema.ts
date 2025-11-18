import {z} from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateImageSchema = z.object({
    images: z
        .array(
            z.instanceof(File)
                .refine((file) => file.size <= MAX_FILE_SIZE, "Максимальный размер файла 5MB")
                .refine(
                    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
                    "Только .jpg, .jpeg, .png и .webp форматы поддерживаются"
                )
        )
        .max(10, "Максимум 10 изображений"),
});

export type UpdateImageFormData = z.infer<typeof updateImageSchema>;