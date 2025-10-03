import * as z from "zod";

export const addServiceSchema = z.object({
    key: z.string().min(1, "Обязательное поле"),
    value: z.string().min(1, "Обязательное поле"),
});

export type AddServiceFormData = z.infer<typeof addServiceSchema>;