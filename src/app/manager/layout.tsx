import {SidebarProvider} from "@/shared/ui/sidebar";
import {Toaster} from "sonner";
import {ManagerSidebar} from "@/widgets/sidebar/ui/ManagerSidebar";

export default function SuperManagerLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <SidebarProvider >
            <ManagerSidebar />
            <main className={"p-4 w-full"}>
                {children}
            </main>
            <Toaster />
        </SidebarProvider>
    )

}
