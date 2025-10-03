import {LoginForm} from "@/features/auth/manager/login/ui/LoginForm";

export default function LoginPage() {
    return (
        <section className={"flex flex-col h-[100dvh] gap-3 max-md:gap-5 justify-center items-center"}>
            <h2 className={"text-4xl font-bold max-md:text-3xl"}>Войти в систему</h2>
            <p className={"w-md text-center max-md:text-sm opacity-70"}>Авторизация для менеджеров</p>
            <LoginForm />
        </section>
    )
}