"use server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust this import path as needed
import { redirect } from "next/navigation";

export async function dashboardServerAction() {
	const session = await getServerSession(authOptions);

	if (!session) {
		redirect("/merchandise");
	}

	const obinsunUser = session.user;

	const obinsunAccessors = {
		stripeAccess: obinsunUser?.stripeId || "",
		firestoreAccess: obinsunUser?.firestoreId || "",
		printfulAccess: "",
		nextAccess: "",
	};

	const headers: Record<string, string> = {
		"Content-Type": "Application/json",
		Authorization: `Bearer ${obinsunUser?.nexusconjureId || ""}`,
		message: "~ retrieving gets ~",
	};

	if (obinsunAccessors.stripeAccess) {
		headers.stripe_accessor = obinsunAccessors.stripeAccess;
	}

	if (obinsunAccessors.firestoreAccess) {
		headers.firestore_accessor = obinsunAccessors.firestoreAccess;
	}

	const getRetrieval: RequestInit = {
		method: "GET",
		headers: headers,
	};

	try {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_URL}/api/merchandise/get/${obinsunUser?.nexusconjureId || ""}`,
			getRetrieval
		);
		const data = await response.json();
		return { session, data };
	} catch (error) {
		console.error("Error fetching data:", error);
		return { session, error: "Failed to fetch data" };
	}
}
