import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/access-mentalhealth/access-mentalhealth.css";
import { AMHProviderWrapper } from "@/wrappers/access-mentalhealth/Access-MentalHealthProvider";

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

export default function AMHRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <AMHProviderWrapper>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    {children}
                </body>
            </html>
        </AMHProviderWrapper>
    );
}
