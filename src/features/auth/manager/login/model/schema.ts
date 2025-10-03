import {z} from "zod";

export const managerLoginSchema = z.object({
    email: z.email("Введите кооректный Email").min(1, "Email обязателен"),
    password: z.string().min(6, "Пароль должен быть не менее 6 символов"),
})


export type ManagerLoginFormData = z.infer<typeof managerLoginSchema>;