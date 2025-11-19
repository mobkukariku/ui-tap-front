import {ClientHeader} from "@/widgets/client-header/ui/ClientHeader";

export default function ClientLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={"bg-green-50 min-h-screen flex flex-col"}>
            <ClientHeader />
            <main className={"flex-1"}>
                {children}
            </main>
        </div>
    )
}