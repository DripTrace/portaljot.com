"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust this import path as needed

export async function getSessionAction() {
	const session = await getServerSession(authOptions);
	console.log("GETTING SESSION >>>", session);
	return session;
}
