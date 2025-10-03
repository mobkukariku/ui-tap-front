import {z} from "zod";

export const managerRegisterSchema = z
    .object({
        email: z.email('Введите корректный email').min(1, 'Email обязателен'),
        name: z.string().min(1, 'Имя обязательно'),
        password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
        confirm_password: z.string().min(6, 'Пароль должен быть не менее 6 символов')
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Пароли не совпадают",
        path: ["confirm_password"]
    })


export type ManagerRegisterFormData = z.infer<typeof managerRegisterSchema>;