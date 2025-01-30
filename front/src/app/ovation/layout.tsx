// // // import { ViewportProvider } from "@/lib/hooks/useViewportContext";
// // // import type { Metadata } from "next";
// // // import "../styles/globals.css";

// // // export const metadata: Metadata = {
// // //     title: "Ovation",
// // //     description: "Ovation app",
// // // };

// // // export default function RootLayout({
// // //     children,
// // // }: {
// // //     children: React.ReactNode;
// // // }) {
// // //     return (
// // //         <ViewportProvider>
// // //             <html className="base">
// // //                 <body className="view">{children}</body>
// // //             </html>
// // //         </ViewportProvider>
// // //     );
// // // }

// // import { Providers } from "@/lib/state/redux/StoreProvider";
// // import "../styles/globals.css";
// // import type { Metadata } from "next";
// // import { Inter } from "next/font/google";

// // const inter = Inter({ subsets: ["latin"] });

// // export const metadata: Metadata = {
// //     title: "Ovation",
// //     description: "Ovation app",
// // };

// // export default function RootLayout({
// //     children,
// // }: {
// //     children: React.ReactNode;
// // }) {
// //     return (
// //         <Providers>
// //             <html lang="en">
// //                 <body
// //                     className={`/*${inter.className} text-white bg-gray-400*/ view`}
// //                 >

// //                     {children}
// //                 </body>
// //             </html>
// //         </Providers>
// //     );
// // }

// // import { ViewportProvider } from "@/lib/hooks/useViewportContext";
// // import type { Metadata } from "next";
// // import "../styles/globals.css";

// // export const metadata: Metadata = {
// //     title: "Ovation",
// //     description: "Ovation app",
// // };

// // export default function RootLayout({
// //     children,
// // }: {
// //     children: React.ReactNode;
// // }) {
// //     return (
// //         <ViewportProvider>
// //             <html className="base">
// //                 <body className="view">{children}</body>
// //             </html>
// //         </ViewportProvider>
// //     );
// // }

import { Providers } from "@/lib/state/redux/StoreProvider";
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Ovation",
    description: "Ovation Social",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en" className="base">
                <body className="view">{children}</body>
            </html>
        </Providers>
    );
}
