import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem
} from "@/shared/ui/sidebar";
import {Avatar, AvatarFallback, AvatarImage} from "@/shared/ui/avatar";
import {LayoutDashboardIcon, Settings, User} from "lucide-react";

const items = [
    {
        title: "Accommodation",
        url: "/admin/accommodations",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Услуги",
        url: "/admin/services",
        icon: Settings,
    },
    {
        title: "Условия",
        url: "/admin/conditions",
        icon: Settings,
    },
    {
        title: "Пользователи",
        url: "/admin/users",
        icon: User,
    }
]

export function AdminSidebar() {
    return (
        <Sidebar>
            <SidebarHeader className={"p-4"}>
                <figure
                    className={"flex items-center gap-2"}>
                    <Avatar className={"w-10 h-10"}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <figcaption
                        className={"flex flex-col gap-0"}>
                        <p>
                            Freddie Mercury
                        </p>
                        <p className={"text-gray-500 text-xs dark:text-gray-400"}>
                            Admin
                        </p>
                    </figcaption>
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
            <SidebarFooter>

            </SidebarFooter>
        </Sidebar>
    )
}

