import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { doc, updateDoc } from "firebase/firestore";
import { db, timestamp } from "@/lib/merchandise/database/firebaseStorage";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

const obinsunBase = `${process.env.NEXT_PUBLIC_URL}/api/merchandise/`;

export async function GET(req: NextRequest) {
	try {
		const headers = req.headers;
		console.dir(
			{
				"obinsun-message-logger": headers,
			},
			{
				depth: null,
				maxArrayLength: null,
				colors: true,
			}
		);

		const stripeAccessor = headers.get("stripe_accessor") || "";
		const firestoreAccessor = headers.get("firestore_accessor") || "";

		if (!stripeAccessor || !firestoreAccessor) {
			return NextResponse.json(
				{
					error: "Missing required headers: stripe_accessor or firestore_accessor.",
				},
				{ status: 400 }
			);
		}

		const putBalance = async (sA: string, fA: string) => {
			const stripeBalanceDoc = doc(db, "users", fA);
			const getBalance = await stripe.balance.retrieve({
				stripeAccount: sA,
			});

			console.dir(
				{
					"stripe-balance-logger": getBalance,
				},
				{
					depth: null,
					maxArrayLength: null,
					colors: true,
				}
			);

			const balanceGetParams = {
				stripeBalance: {
					balanceGotten: timestamp,
					availableBalance: getBalance.available,
					instantAvailableBalance: getBalance.instant_available,
					pendingBalance: getBalance.pending,
				},
			};
			await updateDoc(stripeBalanceDoc, balanceGetParams);
		};

		await putBalance(stripeAccessor, firestoreAccessor);

		return NextResponse.json({
			message:
				"Stripe balance retrieved and Firestore updated successfully.",
		});
	} catch (error) {
		console.error("Error retrieving balance:", error);
		return NextResponse.json(
			{
				error: "Failed to retrieve balance or update Firestore.",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}

export async function POST() {
	return NextResponse.redirect(obinsunBase, 307).json({
		obinsunError:
			"You must be signed in to access this protected API route.",
	});
}

export const config = {
	runtime: "edge",
};
