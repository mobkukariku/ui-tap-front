import {ClientHeader} from "@/widgets/client-header/ui/ClientHeader";

export default function ClientLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
       <>
           <div className={"bg-green-50 h-screen"}>
               <ClientHeader/>
               {children}
           </div>
       </>
    )
}
