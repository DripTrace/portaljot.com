// "use client";

// import { DefaultSeo } from "next-seo";
// import { Provider } from "react-redux";
// import { useEffect, useState } from "react";
// import { AnimatePresence } from "framer-motion";
// import "normalize.css";
// import "tailwindcss/tailwind.css";
// import Head from "next/head";
// import Link from "next/link";
// import store from "@/lib/merchandise/state/store";
// import Obinsun from "@/lib/merchandise/Production/Obinsun";
// import useProgressStore from "@/lib/merchandise/state/progressing/useProgressStore";
// import Progress from "@/components/merchandise/Progress/Progress";
// import Preload from "@/components/merchandise/Progress/Preload";
// import UserProvider from "@/lib/merchandise/features/UserContext";
// import { AppProps } from "next/app";
// import NextAuthProvider from "@/lib/merchandise/context/NextAuthProvider";
// import { WishlistProvider } from "@/lib/merchandise/context/WishlistProvider";

// interface LayoutProps extends AppProps {
//     children: React.ReactNode;
// }

// export default function Layout({ children }: { children: React.ReactNode }) {
//     const [loading, setLoading] = useState(false);
//     const isAnimating = useProgressStore((state) => state.isAnimating);

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             if (
//                 localStorage.theme === "dark" ||
//                 (!("theme" in localStorage) &&
//                     window.matchMedia("(prefers-color-scheme: dark)").matches)
//             ) {
//                 document.documentElement.classList.add("dark");
//             } else {
//                 document.documentElement.classList.remove("dark");
//             }
//         }
//     }, []);

//     useEffect(() => {
//         setTimeout(() => setLoading(!loading), 500);
//     }, []);

//     // waitwith mode='wait

//     return (
//         <>
//             <Head>
//                 <Link rel="icon" href="/merchandise/Grim2021.svg" />
//                 <Link
//                     href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fuzzy+Bubbles:wght@400;700&family=Grandstander:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
//                     rel="stylesheet"
//                 />
//             </Head>
//             <div className="antialiased font-grandstander bg-gray-300 dark:bg-gray-800 text-black dark:text-[#4C8EFF] transition-colors duration-200">
//                 <DefaultSeo
//                     titleTemplate="%s - Obinsun"
//                     openGraph={{
//                         type: "website",
//                         locale: "en_IE",
//                         url: `${process.env.MERCH_URL}`,
//                         description:
//                             "The personal website for rPalm, graphic artist.",
//                         site_name: "rPalm | obinsun.com",
//                         images: [],
//                     }}
//                     canonical={`${process.env.MERCH_URL}`}
//                 />
//                 <AnimatePresence
//                     mode="wait"
//                     initial={false}
//                     onExitComplete={() => window.scrollTo(0, 0)}
//                 >
//                     {loading ? (
//                         <>
//                             <Progress isAnimating={isAnimating} />
//                             <NextAuthProvider>
//                                 <Provider store={store}>
//                                     <WishlistProvider>
//                                         <UserProvider>
//                                             <Obinsun>{children}</Obinsun>
//                                         </UserProvider>
//                                     </WishlistProvider>
//                                 </Provider>
//                             </NextAuthProvider>
//                         </>
//                     ) : (
//                         <Preload />
//                     )}
//                 </AnimatePresence>
//             </div>
//             <div id="modal-root"></div>
//             <div id="sketch-root"></div>
//         </>
//     );
// }

"use client";

import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import "normalize.css";
import "tailwindcss/tailwind.css";
import Head from "next/head";
import store from "@/lib/merchandise/state/store";
import Obinsun from "@/lib/merchandise/Production/Obinsun";
import useProgressStore from "@/lib/merchandise/state/progressing/useProgressStore";
import Progress from "@/components/merchandise/Progress/Progress";
import Preload from "@/components/merchandise/Progress/Preload";
import UserProvider from "@/lib/merchandise/features/UserContext";
import NextAuthProvider from "@/lib/merchandise/context/NextAuthProvider";
import { WishlistProvider } from "@/lib/merchandise/context/WishlistProvider";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    const [loading, setLoading] = useState(true);
    const isAnimating = useProgressStore((state) => state.isAnimating);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Head>
                <link rel="icon" href="/merchandise/Grim2021.svg" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Fuzzy+Bubbles:wght@400;700&family=Grandstander:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
                    rel="stylesheet"
                />
            </Head>
            <div className="antialiased font-grandstander bg-gray-300 dark:bg-gray-800 text-black dark:text-[#4C8EFF] transition-colors duration-200">
                <DefaultSeo
                    titleTemplate="%s - Obinsun"
                    openGraph={{
                        type: "website",
                        locale: "en_IE",
                        url: `${process.env.MERCH_URL}`,
                        description:
                            "The personal website for rPalm, graphic artist.",
                        site_name: "rPalm | obinsun.com",
                        images: [],
                    }}
                    canonical={`${process.env.MERCH_URL}`}
                />
                <AnimatePresence
                    mode="wait"
                    initial={false}
                    onExitComplete={() => window.scrollTo(0, 0)}
                >
                    {loading ? (
                        <Preload />
                    ) : (
                        <>
                            <Progress isAnimating={isAnimating} />
                            <NextAuthProvider>
                                <Provider store={store}>
                                    <WishlistProvider>
                                        <UserProvider>
                                            <Obinsun>{children}</Obinsun>
                                        </UserProvider>
                                    </WishlistProvider>
                                </Provider>
                            </NextAuthProvider>
                        </>
                    )}
                </AnimatePresence>
            </div>
            <div id="modal-root"></div>
            <div id="sketch-root"></div>
        </>
    );
}
