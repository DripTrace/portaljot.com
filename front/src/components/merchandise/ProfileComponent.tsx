"use client";

import { useEffect } from "react";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust this import path as needed
import ContentComponent from "@/components/merchandise/ContentComponent";
import UserProfile from "@/components/merchandise/Profile/UserProfile";

const title = "Welcome, this is Obinsun 👋";
const subtitle =
    "You will find a plethora of custom graphic designs attached to high quality merchandise.";

export default function ProfileComponent() {
    useEffect(() => {
        async function fetchSession() {
            await checkSession();
        }
        fetchSession();
    }, []);

    return (
        <>
            <ContentComponent
                title="Profile"
                description={`${title} - ${subtitle}`}
            >
                <UserProfile />
            </ContentComponent>
        </>
    );
}
