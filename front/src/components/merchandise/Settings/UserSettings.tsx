"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import SettingsForm from "./SettingsForm";
import ExternalAccounts from "./ExternalAccounts";

const UserSettings: React.FC = () => {
    const { data: session, status } = useSession();

    useEffect(() => {
        console.log("session loaded");
    }, [session]);

    return (
        <div className="relative h-[100%] w-[100%] flex items-center justify-center">
            {!session?.user?.stripeId ? <SettingsForm /> : <ExternalAccounts />}
        </div>
    );
};

export default UserSettings;
