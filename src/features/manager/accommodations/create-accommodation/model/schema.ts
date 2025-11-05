import {z} from "zod";

export const createAccommodationSchema = z.object({
    name: z.string().min(1, "Имя обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    address: z.string().min(1, "Адрес обязательно"),
    cityId: z.string("Город обязательно").min(1),
    rating: z.preprocess((val) => Number(val), z.number("Введите число").min(1, "Рейтинг обязательно").max(5, "Максимум 5")),
    districtId: z.string("Округ обязательно").min(1, "Обязательно"),
})

export type CreateAccommodationFormData = z.infer<typeof createAccommodationSchema>;