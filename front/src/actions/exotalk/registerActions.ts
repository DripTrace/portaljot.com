// "use server";

// import { authOptions } from "@/types/exotalk/auth";
// import { adminDb } from "@/config/exotalk/firebase-admin";
// import { getServerSession } from "next-auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
// import Stripe from "stripe";
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
// 	apiVersion: "2024-12-18.acacia",
// });

// export async function generatePortalLink() {
// 	const session = await getServerSession(authOptions);
// 	const host = (await headers()).get("host");

// 	if (!session?.user.id) return console.error("No user Id found");
// 	const {
// 		user: { id },
// 	} = session;

// 	const returnUrl =
// 		process.env.NODE_ENV === "development"
// 			? `http://${host}/register`
// 			: `https://${host}/register`;

// 	const doc = await adminDb.collection("customers").doc(id).get();
// 	if (!doc.data)
// 		return console.error("No customer record found with userId: ", id);

// 	const stripeId = doc.data()!.stripeId;
// 	const stripeSession = await stripe.billingPortal.sessions.create({
// 		customer: stripeId,
// 		return_url: returnUrl,
// 	});

// 	redirect(stripeSession.url);
// }

"use server";

import { authOptions } from "@/app/api/modify/auth/route";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Stripe from "stripe";

// Import Prisma client
import { prisma } from "@/lib/client/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_EXOTALK!, {
	apiVersion: "2024-12-18.acacia",
});

export async function generatePortalLink() {
	const session = await getServerSession(authOptions);
	const host = (await headers()).get("host");

	if (!session?.user?.id) {
		console.error("No user Id found");
		return;
	}

	const { id } = session.user;

	// Example return URL—adjust as needed
	const returnUrl =
		process.env.NODE_ENV === "development"
			? `http://${host}/register`
			: `https://${host}/register`;

	// Fetch the customer record from Prisma instead of Firestore
	const customerRecord = await prisma.customer.findUnique({
		where: { userId: id },
	});

	if (!customerRecord) {
		console.error("No customer record found for userId:", id);
		return;
	}

	const stripeId = customerRecord.stripeId;
	if (!stripeId) {
		console.error("No Stripe ID associated with userId:", id);
		return;
	}

	// Create billing portal session in Stripe
	const stripeSession = await stripe.billingPortal.sessions.create({
		customer: stripeId,
		return_url: returnUrl,
	});

	// Finally, redirect to the portal URL
	redirect(stripeSession.url);
}
