import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from '@/components/header';


export const metadata: Metadata = {
    title: "Pokedex Spectra",
    description: "Pokedex",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased `}
            >
                <Header />
                {children}
            </body>
        </html>
    );
}
