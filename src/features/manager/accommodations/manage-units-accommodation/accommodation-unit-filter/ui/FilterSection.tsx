"use client";
import { ReactNode } from "react";

export function FilterSection({ children }: { children: ReactNode }) {
    return (
        <div className="bg-gray-50 border my-4 rounded-2xl p-4">
            <p className="opacity-60 mb-6">Дополнительные параметры</p>
            <div className="flex flex-col gap-10">{children}</div>
        </div>
    );
}
