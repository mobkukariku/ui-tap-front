"use client"
import {
    BuildingIcon,
    Calendar1Icon,
    EllipsisVertical,
    InfoIcon,
    LayoutDashboardIcon,
    LogOut
} from "lucide-react";
import {
    Sidebar, SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/shared/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/shared/ui/dropdown-menu";
import {Button} from "@/shared/ui/button";
import {useHandleLogout} from "@/widgets/sidebar/model/useHandleLogout";
import {sessionService} from "@/entities/session/model/sessionService";
import {useEffect, useState} from "react";

const items = [
    {
        title: "Accommodation",
        url: "/manager/accommodations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Заявки",
        url: "/manager/requests",
        icon: InfoIcon,
    },
    {
        title: "Бронирования",
        url: "/manager/bookings",
        icon: Calendar1Icon,
    },
    {
        title: "Номера",
        url: "/manager/rooms",
        icon: BuildingIcon,
    }
]

export function ManagerSidebar() {
    const {handleLogout} = useHandleLogout();
    const [isManager, setIsManager] = useState(false);
    const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
    const user = sessionService.getUserFromToken(token ?? "");

    useEffect(() => {
        setIsManager(true);
    }, []);


    return isManager ? (
        <Sidebar>
            <SidebarHeader className={"p-4"}>
                <figure className={"flex items-center gap-2 justify-between"}>
                    <Avatar className={"w-10 h-10"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <figcaption
                        className={"flex flex-col gap-0"}>
                        <p className={"w-full"}>
                            {user?.given_name}
                        </p>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>
                            {user?.role}
                        </p>
                    </figcaption>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant={"ghost"} size={"sm"}>
                                <EllipsisVertical />
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
                </figure>
            </SidebarHeader>
            <SidebarContent className={"p-4"}>
                <SidebarGroup>
                    <SidebarGroupLabel>Вкладки</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    ) : null;
}