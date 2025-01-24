"use server";

import { authOptions } from "@/app/api/modify/auth/route";
// import { authOptions } from "@/app/api/modify/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";

export async function getNextAuthSessionAction() {
	// const session = await getServerSession(authOptions);
	// console.log("GETTING SESSION >>>", session);
	// return session;
	try {
		const session = await getServerSession(authOptions);

		if (!session) {
			return { status: 401, message: "No active session found" };
		}

		// Respond with the session data
		return { status: 200, session };
	} catch (error) {
		console.error("Session retrieval failed:", error);
		return { status: 500, message: "Failed to retrieve session" };
	}
}
