"use client";

import Head from "next/head";
import { useTheme } from "next-themes";
import ThemeToggle from "@/components/background/ThemeToggle";
import Reader from "@/components/background/Reader";
import BackgroundHeader from "@/components/background/BackgroundHeader";
import BackgroundFooter from "@/components/background/BackgroundFooter";

export default function BackgroundHome() {
    const { theme } = useTheme();

    return (
        <div
            className={`min-h-screen bg-canvas text-canvasText theme-transition ${theme}`}
        >
            <Head>
                <title>Loma Linda Psychiatric Medical Group</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ThemeToggle />

            <BackgroundHeader />

            <main className="relative z-10">
                <Reader />
                <section className="min-h-screen grid place-items-center">
                    <h2 className="text-4xl sm:text-6xl font-bold">
                        <span className="text-accent">You</span> got this.
                    </h2>
                </section>
            </main>

            <BackgroundFooter />
        </div>
    );
}
