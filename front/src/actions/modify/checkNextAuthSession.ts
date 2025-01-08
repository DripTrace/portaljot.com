"use server";

import { authOptions } from "@/app/api/modify/auth/route";
// import { authOptions } from "@/app/api/modify/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export async function checkNextAuthSession() {
	const session = await getServerSession(authOptions);
	console.log("CHECKING SESSION >>>", session);

	if (!session) {
		redirect("/modify");
	}

	return session;
}
