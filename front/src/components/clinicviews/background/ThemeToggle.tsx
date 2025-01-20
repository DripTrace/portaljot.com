// "use client";

// import { useEffect, useRef } from "react";
// import { useTheme } from "next-themes";

// interface ViewTransitionDocument extends Document {
//     startViewTransition?: (callback: () => void) => void;
// }

// export default function ThemeToggle() {
//     const { theme, setTheme } = useTheme();
//     const toggleRef = useRef<HTMLButtonElement>(null);

//     useEffect(() => {
//         const switchTheme = () => {
//             setTheme(theme === "dark" ? "light" : "dark");
//         };

//         const toggleTheme = () => {
//             if (!(document as ViewTransitionDocument).startViewTransition) {
//                 switchTheme();
//             } else {
//                 (
//                     document as Document & {
//                         startViewTransition: (callback: () => void) => void;
//                     }
//                 ).startViewTransition(() => {
//                     switchTheme();
//                 });
//             }
//         };

//         const toggle = toggleRef.current;
//         if (toggle) {
//             toggle.addEventListener("click", toggleTheme);
//         }

//         return () => {
//             if (toggle) {
//                 toggle.removeEventListener("click", toggleTheme);
//             }
//         };
//     }, [theme, setTheme]);

//     return (
//         <button
//             ref={toggleRef}
//             aria-pressed={theme === "light"}
//             className="theme-toggle fixed top-4 right-4 w-12 aspect-square p-0 border-0 grid place-items-center rounded-xl bg-transparent transition-colors duration-200 cursor-pointer z-10"
//         >
//             <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 strokeWidth="1.5"
//                 stroke="currentColor"
//                 className="w-6 h-6"
//             >
//                 {theme === "dark" ? (
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591 1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
//                     />
//                 ) : (
//                     <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
//                     />
//                 )}
//             </svg>
//             <span className="sr-only">Toggle Theme</span>
//         </button>
//     );
// }

"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Add this type declaration at the top of your file
declare global {
    interface Document {
        startViewTransition?: (callback: () => void) => void;
    }
}

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const toggleRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const switchTheme = () => {
            setTheme(theme === "dark" ? "light" : "dark");
        };

        const toggleTheme = () => {
            if (!document.startViewTransition) {
                switchTheme();
            } else {
                document.startViewTransition(() => {
                    switchTheme();
                });
            }
        };

        const toggle = toggleRef.current;
        if (toggle) {
            toggle.addEventListener("click", toggleTheme);
        }

        return () => {
            if (toggle) {
                toggle.removeEventListener("click", toggleTheme);
            }
        };
    }, [theme, setTheme]);

    return (
        // <button
        //     ref={toggleRef}
        //     aria-pressed={theme === "light"}
        //     className="theme-toggle fixed top-4 right-4 w-12 h-12 p-0 border-0 rounded-full bg-gray-200 dark:bg-gray-800 transition-colors duration-200 cursor-pointer z-50"
        // >
        //     {theme === "dark" ? (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             fill="none"
        //             viewBox="0 0 24 24"
        //             stroke="currentColor"
        //             className="w-6 h-6 text-yellow-500 m-auto"
        //         >
        //             <path
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //                 strokeWidth={2}
        //                 d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        //             />
        //         </svg>
        //     ) : (
        //         <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             fill="none"
        //             viewBox="0 0 24 24"
        //             stroke="currentColor"
        //             className="w-6 h-6 text-gray-900 m-auto"
        //         >
        //             <path
        //                 strokeLinecap="round"
        //                 strokeLinejoin="round"
        //                 strokeWidth={2}
        //                 d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        //             />
        //         </svg>
        //     )}
        //     <span className="sr-only">Toggle Theme</span>
        // </button>
        <button
            ref={toggleRef}
            aria-label="Toggle theme"
            className="fixed top-4 right-4 w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg z-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
            {theme === "dark" ? (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-yellow-400"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-900"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}
