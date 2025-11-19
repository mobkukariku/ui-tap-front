// schema.ts
import { z } from "zod"

export const searchFormSchema = z.object({
    checkInDate: z.string()
        .min(1, "Выберите дату заезда")
        .refine((date) => {
            const selected = new Date(date)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            return selected >= today
        }, "Дата заезда не может быть в прошлом"),

    checkOutDate: z.string()
        .min(1, "Выберите дату выезда"),

    oneNight: z.boolean(),

    cityId: z.string().min(1, "Город обязателен"),

    price: z.coerce
        .number<number>("Введите цену")
        .min(0, "Цена не может быть отрицательной")
        .max(1000000, "Цена не может превышать 1,000,000"),
    countOfPeople: z.coerce
        .number<number>()
        .min(1, "Минимум 1 гость")
        .max(20, "Максимум 20 гостей")
        .optional()
        .nullable(),

    fromRating: z.number()
        .min(0, "Минимальный рейтинг: 0")
        .max(5, "Максимальный рейтинг: 5")
        .optional(),

    toRating: z.number()
        .min(0, "Минимальный рейтинг: 0")
        .max(5, "Максимальный рейтинг: 5")
        .optional(),

    unitType: z.string().optional(),

    districtIds: z.array(z.number()),

    serviceDictionaryIds: z.array(z.number()),

    conditionDictionaryIds: z.array(z.number()),
}).refine((data) => {
    if (!data.checkInDate || !data.checkOutDate) return true
    return new Date(data.checkOutDate) > new Date(data.checkInDate)
}, {
    message: "Дата выезда должна быть позже даты заезда",
    path: ["checkOutDate"]
}).refine((data) => {
    if (!data.fromRating || !data.toRating) return true
    return data.toRating >= data.fromRating
}, {
    message: "Максимальный рейтинг должен быть больше минимального",
    path: ["toRating"]
})

export type SearchFormData = z.infer<typeof searchFormSchema>