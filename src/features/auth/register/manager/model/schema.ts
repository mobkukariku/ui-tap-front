import {z} from "zod";

export const managerRegisterSchema = z
    .object({
        username: z.string().min(1, "Никнейм обязателен"),
        firstName: z.string().min(1, 'Имя обязательно'),
        lastName: z.string().min(1, 'Фамилия обязательна'),
        email: z.email('Введите корректный email').min(1, 'Email обязателен'),
        password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
        phoneNumber: z.string().min(1, "Номер телефона обязателен")
    })


export type ManagerRegisterFormData = z.infer<typeof managerRegisterSchema>;