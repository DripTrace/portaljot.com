// // components/InstallPrompt.tsx
// "use client";

// import { useState, useEffect } from "react";

// const InstallPrompt: React.FC = () => {
//     const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

//     useEffect(() => {
//         const handler = (e: Event) => {
//             // Prevent Chrome 67 and earlier from automatically showing the prompt
//             e.preventDefault();
//             // Stash the event so it can be triggered later
//             setDeferredPrompt(e);
//             // Show the alert to the user
//             alert("Do you want to install this app?");
//         };

//         window.addEventListener("beforeinstallprompt", handler);

//         return () => window.removeEventListener("beforeinstallprompt", handler);
//     }, []);

//     useEffect(() => {
//         if (deferredPrompt) {
//             deferredPrompt.prompt();
//             deferredPrompt.userChoice.then(
//                 (choiceResult: { outcome: string }) => {
//                     if (choiceResult.outcome === "accepted") {
//                         console.log("User accepted the install prompt");
//                     } else {
//                         console.log("User dismissed the install prompt");
//                     }
//                     setDeferredPrompt(null);
//                 }
//             );
//         }
//     }, [deferredPrompt]);

//     return null; // This component doesn't render anything
// };

// export default InstallPrompt;

// components/InstallPrompt.tsx

// "use client";
// import React, { useState, useEffect } from "react";

// const InstallPrompt: React.FC = () => {
//     const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
//     const [showCustomPrompt, setShowCustomPrompt] = useState(false);

//     useEffect(() => {
//         const handler = (e: Event) => {
//             e.preventDefault();
//             setDeferredPrompt(e);
//             setShowCustomPrompt(true);
//         };

//         window.addEventListener("beforeinstallprompt", handler);

//         return () => window.removeEventListener("beforeinstallprompt", handler);
//     }, []);

//     const handleInstallClick = () => {
//         setShowCustomPrompt(false);
//         if (deferredPrompt) {
//             deferredPrompt.prompt();
//             deferredPrompt.userChoice.then(
//                 (choiceResult: { outcome: string }) => {
//                     if (choiceResult.outcome === "accepted") {
//                         console.log("User accepted the install prompt");
//                     } else {
//                         console.log("User dismissed the install prompt");
//                     }
//                     setDeferredPrompt(null);
//                 }
//             );
//         }
//     };

//     if (!showCustomPrompt) return null;

//     return (
//         <div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
//             <p className="text-gray-800 mb-3">
//                 Would you like to install this app?
//             </p>
//             <div className="flex space-x-2">
//                 <button
//                     onClick={handleInstallClick}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Install
//                 </button>
//                 <button
//                     onClick={() => setShowCustomPrompt(false)}
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//                 >
//                     Not now
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default InstallPrompt;

//delay
// components/InstallPrompt.tsx

// "use client";

// import React, { useState, useEffect, useCallback } from "react";
// import ErrorBoundary from "./ErrorBoundary";
// // import ErrorBoundary from './ErrorBoundary';

// const InstallPrompt: React.FC = () => {
//     const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
//     const [showCustomPrompt, setShowCustomPrompt] = useState(false);
//     const [notificationPermissionHandled, setNotificationPermissionHandled] =
//         useState(false);

//     const handleBeforeInstallPrompt = useCallback((e: Event) => {
//         e.preventDefault();
//         setDeferredPrompt(e);
//     }, []);

//     useEffect(() => {
//         window.addEventListener(
//             "beforeinstallprompt",
//             handleBeforeInstallPrompt
//         );

//         // Check if notification permission has already been granted or denied
//         if (Notification.permission !== "default") {
//             setNotificationPermissionHandled(true);
//         }

//         return () => {
//             window.removeEventListener(
//                 "beforeinstallprompt",
//                 handleBeforeInstallPrompt
//             );
//         };
//     }, [handleBeforeInstallPrompt]);

//     const handleNotificationPermission = async () => {
//         try {
//             await Notification.requestPermission();
//             setNotificationPermissionHandled(true);
//         } catch (error) {
//             console.error("Error requesting notification permission:", error);
//             setNotificationPermissionHandled(true); // Consider it handled even if there's an error
//         }
//     };

//     const handleInstallClick = () => {
//         setShowCustomPrompt(false);
//         if (deferredPrompt) {
//             deferredPrompt.prompt();
//             deferredPrompt.userChoice.then(
//                 (choiceResult: { outcome: string }) => {
//                     if (choiceResult.outcome === "accepted") {
//                         console.log("User accepted the install prompt");
//                     } else {
//                         console.log("User dismissed the install prompt");
//                     }
//                     setDeferredPrompt(null);
//                 }
//             );
//         }
//     };

//     if (!notificationPermissionHandled) {
//         return (
//             <div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
//                 <p className="text-gray-800 mb-3">
//                     Would you like to receive notifications?
//                 </p>
//                 <button
//                     onClick={handleNotificationPermission}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Allow Notifications
//                 </button>
//             </div>
//         );
//     }

//     if (!showCustomPrompt || !deferredPrompt) return null;

//     return (
//         <div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
//             <p className="text-gray-800 mb-3">
//                 Would you like to install this app?
//             </p>
//             <div className="flex space-x-2">
//                 <button
//                     onClick={handleInstallClick}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//                 >
//                     Install
//                 </button>
//                 <button
//                     onClick={() => setShowCustomPrompt(false)}
//                     className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
//                 >
//                     Not now
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default function SafeInstallPrompt() {
//     return (
//         <ErrorBoundary>
//             <InstallPrompt />
//         </ErrorBoundary>
//     );
// }

"use client";

import React, { useState, useEffect } from "react";
import ErrorBoundary from "./ErrorBoundary";

const NotificationPrompt: React.FC = () => {
    const [showNotificationPrompt, setShowNotificationPrompt] = useState(false);

    useEffect(() => {
        if (Notification.permission === "default") {
            setShowNotificationPrompt(true);
        }
    }, []);

    const handleNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            console.log("Notification permission:", permission);
            setShowNotificationPrompt(false);
        } catch (error) {
            console.error("Error requesting notification permission:", error);
            setShowNotificationPrompt(false);
        }
    };

    if (!showNotificationPrompt) return null;

    return (
        <div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
            <p className="text-gray-800 mb-3">
                Would you like to receive notifications?
            </p>
            <button
                onClick={handleNotificationPermission}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
                Allow Notifications
            </button>
        </div>
    );
};

const InstallPrompt: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstallPrompt, setShowInstallPrompt] = useState(false);

    useEffect(() => {
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
            setShowInstallPrompt(true);
            console.log("Before install prompt event captured");
        };

        window.addEventListener(
            "beforeinstallprompt",
            handleBeforeInstallPrompt
        );

        console.log("Install prompt event listener added");

        return () => {
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstallPrompt
            );
        };
    }, []);

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(
                (choiceResult: { outcome: string }) => {
                    if (choiceResult.outcome === "accepted") {
                        console.log("User accepted the install prompt");
                    } else {
                        console.log("User dismissed the install prompt");
                    }
                    setDeferredPrompt(null);
                    setShowInstallPrompt(false);
                }
            );
        }
    };

    if (!showInstallPrompt) return null;

    return (
        <div className="fixed bottom-5 left-5 bg-white p-4 rounded-lg shadow-md z-50">
            <p className="text-gray-800 mb-3">
                Would you like to install this app?
            </p>
            <div className="flex space-x-2">
                <button
                    onClick={handleInstallClick}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Install
                </button>
                <button
                    onClick={() => setShowInstallPrompt(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                    Not now
                </button>
            </div>
        </div>
    );
};

const SafePrompts: React.FC = () => {
    return (
        <ErrorBoundary>
            <NotificationPrompt />
            <InstallPrompt />
        </ErrorBoundary>
    );
};

export default SafePrompts;
