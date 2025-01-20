// components/NotificationExample.tsx

"use client";

import { useEffect } from "react";
import {
    requestNotificationPermission,
    sendNotification,
} from "@/utils/notifications";

const NotificationExample: React.FC = () => {
    useEffect(() => {
        const setup = async () => {
            const permissionGranted = await requestNotificationPermission();
            if (permissionGranted) {
                sendNotification("Welcome to our clinic!", {
                    body: "Thank you for enabling notifications.",
                    icon: "/path-to-your-icon.png",
                });
            }
        };

        setup();
    }, []);

    return null; // This component doesn't render anything
};

export default NotificationExample;
