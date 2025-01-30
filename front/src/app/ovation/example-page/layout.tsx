import { ViewportProvider } from "@/lib/hooks/useViewportContext";
import type { Metadata } from "next";
// import "@/styles/example-style/ExampleButton.module.scss"; // Fixed typo here
import "@/styles/example-style/ExampleButtonLeverage.module.scss"; // Fixed typo here

export const metadata: Metadata = {
    title: "Ovation",
    description: "Ovation app",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ViewportProvider>
            <html className="size-full relative">
                <body className="font-sans size-full relative">{children}</body>
            </html>
        </ViewportProvider>
    );
}
