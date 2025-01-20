"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/merchandise/api/auth/[...nextauth]"; // Adjust this import path as needed
import { redirect } from "next/navigation";

export async function checkSession() {
    const session = await getServerSession(authOptions);
    console.log("CHECKING SESSION >>>", session);

    if (!session) {
        redirect("/merchandise");
    }

    return session;
}
