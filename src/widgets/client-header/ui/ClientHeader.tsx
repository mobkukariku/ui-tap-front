"use client"
import {Container} from "@/shared/ui/container";
import {Calendar, FileText, Home, LogOut, Search, User} from "lucide-react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import {Button} from "@/shared/ui/button";
import {useHandleLogout} from "@/shared/hooks/useHandleLogout";

export function ClientHeader() {
    const {handleLogout} = useHandleLogout();

    const pathname = usePathname();


    const navItems = [
        { href: "/client", label: "Главная", icon: Home },
        { href: "/client/search", label: "Поиск", icon: Search },
        { href: "/client/requests", label: "Мои заявки", icon: FileText },
        { href: "/client/reservations", label: "Мои Бронирования", icon: Calendar },
    ]


    return (
        <header className={"pt-10 pb-5 border-b border-gray-200 dark:border-gray-700"}>
            <Container className={"flex  justify-between items-center"}>
                <div className={"font-black text-4xl"}>
                    <Link href={"/client"}>
                        UI Tap
                    </Link>
                </div>
                <nav className="hidden md:block">
                    <ul className="flex items-center gap-1">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = pathname === item.href

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg
                                            font-medium transition-all duration-200
                                            ${
                                            isActive
                                                ? "bg-green-100 text-green-700"
                                                : "text-gray-700 hover:text-black"
                                        }
                                        `}
                                        aria-current={isActive ? "page" : undefined}
                                    >
                                        <Icon className="w-4 h-4" />
                                        {item.label}
                                    </Link>
                                </li>
                            )
                        })}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant={"ghost"} size={"sm"}>
                                    <User />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={() => handleLogout()}>
                                        <LogOut />
                                        Выйти
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </ul>
                </nav>

            </Container>
        </header>
    )
}