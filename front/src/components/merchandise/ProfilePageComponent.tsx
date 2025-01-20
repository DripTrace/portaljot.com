"use client";

import { useEffect } from "react";
import { checkSession } from "@/actions/merchandise/checkSession"; // Adjust this import path as needed
import UserProfile from "@/components/merchandise/Profile/UserProfile";

export default function ProfilePageComponent() {
    useEffect(() => {
        async function fetchSession() {
            await checkSession();
        }
        fetchSession();
    }, []);

    return <UserProfile />;
}
