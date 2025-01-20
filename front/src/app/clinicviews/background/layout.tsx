import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/background/base.css";
import Script from "next/script";

const geistSans = localFont({
    src: "../../fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "../../fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "Access Mental Health",
    description: "Access Mental Health Care Non-Profit Organization",
};

export default function BackgroundRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="size-full">
            <Script
                src="/background/backgroundScript.js"
                strategy="afterInteractive"
            />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased size-full`}
            >
                {children}
            </body>
        </html>
    );
}
