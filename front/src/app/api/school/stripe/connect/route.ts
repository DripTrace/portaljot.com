import { onAuthenticatedUser } from "@/actions/feature/school/auth";
import { prisma as client } from "@/lib/client/prisma";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_SCHOOL_SCHOOL!, {
	typescript: true,
	apiVersion: "2024-12-18.acacia",
});

export async function GET(req: NextRequest) {
	try {
		const searchParams = req.nextUrl.searchParams;
		const groupid = searchParams.get("groupid");

		// Log the groupid to verify it's being received correctly
		console.log("Received groupid:", groupid);

		if (!groupid) {
			return NextResponse.json(
				{ error: "Group ID is required" },
				{ status: 400 }
			);
		}

		const account = await stripe.accounts.create({
			type: "standard",
			country: "US",
			business_type: "individual",
		});

		if (account) {
			console.log("THE ACCOUNT[CONNECT/ROUTE]: ", account);
			const user = await onAuthenticatedUser();
			if (!user) {
				throw new Error("User authentication failed");
			}
			const integrateStripeAccount = await client.user.update({
				where: {
					id: user.id,
				},
				data: {
					stripeId: account.id,
				},
			});

			if (integrateStripeAccount) {
				const accountLink = await stripe.accountLinks.create({
					account: account.id,
					refresh_url: `${process.env.DOMAIN_URL_SCHOOLL}/callback/stripe/refresh`,
					return_url: `${process.env.DOMAIN_URL_SCHOOLL}/group/${groupid}/settings/integrations`,
					//   refresh_url: `${process.env.NEXT_PUBLIC_URL}/callback/stripe/refresh`,
					//   return_url: `${process.env.NEXT_PUBLIC_URL}/group/${groupid}/settings/integrations`,
					type: "account_onboarding",
				});
				console.log(accountLink);
				return NextResponse.json({
					url: accountLink.url,
				});
			}
		}
	} catch (error) {
		console.error("Error creating Stripe account:", error);
		return new NextResponse(
			"An error occurred when calling the Stripe API to create an account:",
			{ status: 500 }
		);
	}
}
