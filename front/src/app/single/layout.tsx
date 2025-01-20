import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";

export const metadata: Metadata = {
    title: "Russell's Digital Portfolio",
    description: "Russell Brian Fulache Dugaduga Jale Palma",
};

export default function SingleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className="single">
            <head>
                <title>Russell Palma's Resume</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </head>
            <body className="">
                {children}
                <Script
                    src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css"
                    integrity="sha512-5A8nwdMOWrSz20fDsjczgUidUBR8liPYU+WymTZP1lmY9G6Oc7HlZv156XqnsgNUzTyMefFTcsFH/tnJE/+xBg=="
                    crossOrigin="anonymous"
                />
            </body>
        </html>
    );
}
