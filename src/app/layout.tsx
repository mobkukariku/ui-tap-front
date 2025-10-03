import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Geist_Mono } from 'next/font/google'
import {Toaster} from "sonner";

const inter = Inter({ subsets: ['latin', 'cyrillic'] })
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500', '700'] })

export const metadata: Metadata = {
    title: 'TapHome',
    description: 'Платформа для поиска жилья',
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru" suppressHydrationWarning>
            <body className={inter.className}>
                {children}
                <Toaster />
            </body>
        </html>
    )
}
