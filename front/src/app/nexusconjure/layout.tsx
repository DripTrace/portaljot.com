// import type { Metadata } from "next";
// import { DM_Sans } from "next/font/google";
// import "@/styles/globals.css";
// import { ThemeProvider } from "@/providers/theme-provider";
// import ModalProvider from "@/providers/modal-provider";
// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as SonnarToaster } from "@/components/ui/sonner";

// const font = DM_Sans({ subsets: ["latin"] });

// export const metadata: Metadata = {
//     title: "NexusConjure",
//     description: "All in one Agency Solution",
// };

// export default function RootLayout({
//     children,
// }: {
//     children: React.ReactNode;
// }) {
//     return (
//         <html lang="en" suppressHydrationWarning>
//             <body className={font.className}>
//                 <ThemeProvider
//                     attribute="class"
//                     defaultTheme="system"
//                     enableSystem
//                     disableTransitionOnChange
//                 >
//                     <ModalProvider>
//                         {children}
//                         <Toaster />
//                         <SonnarToaster position="bottom-left" />
//                     </ModalProvider>
//                 </ThemeProvider>
//             </body>
//         </html>
//     );
// }

import type { Metadata } from "next";
import "@/styles/globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import Head from "next/head";

export const metadata: Metadata = {
    title: "NexusConjure",
    description: "All in one Agency Solution",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            {/* <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
            </head> */}
            <head>
                <link
                    rel="icon"
                    href="/assets/nexusconjure-vector-optimized.svg"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
                    rel="stylesheet"
                />
                {/* <link
            href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fuzzy+Bubbles:wght@400;700&family=Grandstander:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
            rel="stylesheet"
          /> */}
            </head>
            <body className="font-dm-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ModalProvider>
                        {children}
                        <Toaster />
                        <SonnarToaster position="bottom-left" />
                    </ModalProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
