// "use client";

// import { GeistMono } from "geist/font/mono";
// import { GeistSans } from "geist/font/sans";
// import { SessionProvider } from "next-auth/react";
// import { AppProps } from "next/app";
// import { Inter } from "next/font/google";
// import React from "react";
// import { useEffect, useState } from "react";
// import { ToastContainer } from "react-toastify";

// const inter = Inter({
//     subsets: ["latin"],
//     variable: "--font-inter",
// });

// // const Ovation: React.FC<AppProps> = ({ Component, pageProps }) => {
// //     return (
// //         // <main className={`${inter.variable} font-sans`}>
// //         <main
// //             className={`lang="en" ${GeistSans.variable} ${GeistMono.variable}`}
// //         >
// //             <Component {...pageProps} />
// //         </main>
// //     );
// // };

// // export default Ovation;

// function OvationAppRoot({ Component, pageProps }: AppProps) {
//     const [render, setRender] = useState(false);
//     useEffect(() => setRender(true), []);
//     return render ? (
//         <>
//             <SessionProvider session={pageProps.session}>
//                 <Component {...pageProps} />
//                 <ToastContainer
//                     position="bottom-right"
//                     theme="dark"
//                     pauseOnFocusLoss
//                     draggable
//                     pauseOnHover
//                 />
//             </SessionProvider>
//         </>
//     ) : null;
// }
// export default OvationAppRoot;

// _app.tsx
import React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "@/components/Error/ErrorBoundary";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ErrorBoundary>
            <SessionProvider session={pageProps.session}>
                <Component {...pageProps} />
                <ToastContainer
                    position="bottom-right"
                    theme="dark"
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </SessionProvider>
        </ErrorBoundary>
    );
}

export default MyApp;
