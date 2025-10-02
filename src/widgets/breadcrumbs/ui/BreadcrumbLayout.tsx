import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/shared/ui/breadcrumb";
import Link from "next/link";
import React from "react";

interface BreadcrumbItemData {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItemData[];
}

export function BreadcrumbLayout({ items }: BreadcrumbsProps) {
    return (
        <Breadcrumb className={"mt-2 mb-16"}>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLastItem = index === items.length - 1;

                    return (
                        <React.Fragment key={item.href || item.label}>
                            <BreadcrumbItem>
                                {isLastItem || !item.href ? (
                                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link href={item.href}>{item.label}</Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>

                            {!isLastItem && <BreadcrumbSeparator />}
                        </React.Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}