import { z } from "zod";

export const createAccommodationSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    address: z.string().min(1, "Адрес обязателен"),
    cityId: z.string().min(1, "Город обязателен"),
    districtId: z.string().min(1, "Округ обязателен"),
    rating: z.coerce.number<number>().min(0, "Минимум 0").max(5, "Максимум 5"),
});

export type CreateAccommodationFormData = z.infer<typeof createAccommodationSchema>;
