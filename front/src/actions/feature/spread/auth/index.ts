"use server";

import { prisma as client } from "@/lib/client/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/modify/auth/route";
import { redirect } from "next/navigation";

/**
 * Completes a new user registration in your DB,
 * creating a subscription with necessary fields.
 *
 * @param name - The user's full name
 * @param userId - The user's unique ID from NextAuth
 * @param type - The user type (e.g., 'AGENCY_ADMIN', 'SUBACCOUNT_USER')
 */
export const onCompleteUserRegistration = async (
	name: string,
	userId: string,
	type: string
) => {
	try {
		const now = new Date();

		// Replace these placeholder values with actual data as needed
		const stripeLink = "https://stripe.com/link"; // Example Stripe link
		const quantity = 1; // Example quantity
		const items = JSON.stringify([]); // Example items array
		const priceId = "priceIdObjectId"; // Replace with actual Price ObjectId from your database
		const productId = "productIdObjectId"; // Replace with actual Product ObjectId from your database
		const status = "active"; // Example status
		const currentPeriodStart = now;
		const currentPeriodEnd = new Date(
			now.getTime() + 30 * 24 * 60 * 60 * 1000
		); // 30 days later
		const currentPeriodEndDate = new Date(
			now.getTime() + 30 * 24 * 60 * 60 * 1000
		); // 30 days later
		const subscriptionId = "subscriptionId"; // Replace with actual Subscription ID
		const priceIds = JSON.stringify([priceId]); // Example priceIds as JSON array

		const registered = await client.user.create({
			data: {
				name, // Correct field name
				idDirect: userId, // Assuming 'idDirect' corresponds to NextAuth's user ID
				type,
				subscription: {
					create: {
						stripeLink,
						quantity,
						items,
						priceId,
						productId,
						status,
						currentPeriodStart,
						currentPeriodEnd,
						currentPeriodEndDate,
						subscritiptionId: subscriptionId,
						priceIds, // Added required field
					},
				},
			},
			select: {
				id: true,
				name: true,
				type: true,
				subscription: {
					select: {
						id: true,
						plan: true,
						status: true,
						credits: true,
						clients: true,
						priceIds: true,
					},
				},
			},
		});

		if (registered) {
			return { status: 200, user: registered };
		}
	} catch (error) {
		console.error("Error in onCompleteUserRegistration:", error);
		return { status: 400 };
	}
};

/**
 * Retrieves all account domains for the authenticated user.
 */
export const onGetAllAccountDomains = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user) return;
	try {
		const userWithDomains = await client.user.findUnique({
			where: {
				id: session.user.id, // Assuming session.user.id matches User.id in Prisma
			},
			select: {
				domains: {
					select: {
						name: true,
						icon: true,
						id: true,
						customer: {
							select: {
								chatRoom: {
									select: {
										id: true,
										live: true,
									},
								},
							},
						},
					},
				},
			},
		});
		return { domains: userWithDomains?.domains };
	} catch (error) {
		console.log(error);
	}
};

/**
 * Logs in a user by checking the NextAuth session
 * and returning a matching DB user & domain info.
 */
export const onLoginUser = async () => {
	const session = await getServerSession(authOptions);
	if (!session?.user) {
		redirect("/sign-in");
	} else {
		try {
			const authenticated = await client.user.findUnique({
				where: {
					email: session.user.email ?? "", // Use email to find the user
				},
				select: {
					id: true,
					name: true, // Correct field name
					type: true,
					subscription: {
						select: {
							id: true,
							plan: true,
							status: true,
							credits: true,
							clients: true,
							priceIds: true,
						},
					},
				},
			});

			if (authenticated) {
				const domains = await onGetAllAccountDomains();
				return {
					status: 200,
					user: authenticated,
					domain: domains?.domains,
				};
			} else {
				return { status: 404, message: "User not found" };
			}
		} catch (error) {
			console.error("Error in onLoginUser:", error);
			return { status: 400 };
		}
	}
};
