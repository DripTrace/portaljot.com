"use client";

import { useSession } from "next-auth/react";
import ContentComponent from "@/components/merchandise/ContentComponent";
import { useEffect, useState } from "react";
import UserSettings from "@/components/merchandise/Settings/UserSettings";
import PrintfulSignin from "@/components/merchandise/Settings/PrintfulSignin";
import ExternalAccounts from "@/components/merchandise/Settings/ExternalAccounts";
import WebcamCapture from "@/components/merchandise/Payments/Uploads/WebcamCapture";
import ExistingDocument from "@/components/merchandise/ExistingDocument";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust the import path as needed

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high quality merchandise.";

export default function SettingsComponent() {
    const { data: session, status } = useSession();
    const [payoutMessage, setPayoutMessage] = useState("");

    useEffect(() => {
        async function validateSession() {
            const currentSession = await checkSession();
            let payoutsActivity =
                currentSession?.user?.neccessary_actions.currently_due || [];

            if (payoutsActivity.length !== 0) {
                setPayoutMessage(
                    "PAYOUTS DISABLED. Please complete necessary actions in order to receive payments."
                );
            } else {
                setPayoutMessage(
                    "You're all caught up and should now be able to receive payments!"
                );
            }
        }

        validateSession();

        console.log("session loaded", session?.user?.neccessary_actions);
        console.log("session loaded", session?.user?.verification);
    }, [session]);

    return (
        <>
            <ContentComponent
                title="Settings"
                description={`${title} - ${subtitle}`}
            >
                Todos: Necessary Actions - {payoutMessage}
                <UserSettings />
                <PrintfulSignin />
                <ExternalAccounts />
                <WebcamCapture />
                <ExistingDocument />
            </ContentComponent>
        </>
    );
}
