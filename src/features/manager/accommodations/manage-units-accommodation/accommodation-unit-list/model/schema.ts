import { z } from "zod";

export const updateAccommodationUnitSchema = z.object({
    unitType: z.string().min(1, "Выберите тип"),
    name: z.string().min(1, "Имя обязательно"),
    description: z.string().min(1, "Описание обязательно"),
    capacity: z.coerce.number<number>().min(0, "Минимум 0").max(20, "Максимум 20"),
    area: z.coerce.number<number>().min(0, "Минимум 0").max(400, "Максимум 400"),
    floor: z.coerce.number<number>().min(0, "Минимум 0").max(100, "Максимум 100"),
    isAvailable: z.boolean(),
});

export type UpdateAccommodationUnitFormData = z.infer<typeof updateAccommodationUnitSchema>;

export const updateAccommodationUnitDictionariesSchema = z.object({
    serviceDictionaryIds: z.array(z.coerce.number<number>()),
    conditionDictionaryIds: z.array(z.coerce.number<number>()),
});

export type UpdateAccommodationUnitDictionariesFormData = z.infer<typeof updateAccommodationUnitDictionariesSchema>;

