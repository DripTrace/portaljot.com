// import ThemeToggle from "@/components/background/ThemeToggle";
// import { BackgroundThemeProvider } from "@/context/background/BackgroundContext";
// import "@/styles/background/background-home/background-home.css";

// export default function Layout({ children }: { children: React.ReactNode }) {
//     return (
//         <html lang="en">
//             <BackgroundThemeProvider>
//                 <body>{children}</body>
//             </BackgroundThemeProvider>
//         </html>
//     );
// }

import ThemeToggle from "@/components/background/ThemeToggle";
import { BackgroundThemeProvider } from "@/context/background/BackgroundContext";
import "@/styles/background/background-home/background-home.css";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <BackgroundThemeProvider>
                <body>
                    <ThemeToggle />
                    {children}
                </body>
            </BackgroundThemeProvider>
        </html>
    );
}
