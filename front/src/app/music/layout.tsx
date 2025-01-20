import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import MusicHeader from "@/components/music/MusicHeader";
import MusicFooter from "@/components/music/MusicFooter";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "nexusconjure music generation",
    description: "Use API to call the music generation ai of suno.ai",
    keywords: [
        "suno",
        "suno api",
        "suno.ai",
        "api",
        "music",
        "generation",
        "ai",
    ],
    creator: "@russellpalma.com",
};

export default function MusicRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} overflow-y-scroll`}>
                <MusicHeader />
                <main className="flex flex-col items-center m-auto w-full">
                    {children}
                </main>
                <MusicFooter />
                <Analytics />
            </body>
        </html>
    );
}
