import { Metadata } from "next";
import "@/styles/globals.css";
import ClientLayout from "@/components/LLPMG/ClientLayout";

export const metadata: Metadata = {
    title: "LLPMG",
    description: "Loma Linda Psychiatric Medical Group",
};

export default function LLPMGRootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="w-screen">
            <body className="w-full">
                <ClientLayout>{children}</ClientLayout>
            </body>
        </html>
    );
}
