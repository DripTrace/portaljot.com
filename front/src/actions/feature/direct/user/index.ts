"use server";

import { getServerSession } from "next-auth";
// If you have a custom NextAuth config, import it as:
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// Then pass it to getServerSession(authOptions)
import { authOptions } from "@/app/api/modify/auth/route"; // Adjust path if needed

import { redirect } from "next/navigation";
import { createUser, findUser, updateSubscription } from "./queries";
import { refreshToken } from "@/lib/direct/fetch";
import { updateIntegration } from "../integrations/queries";
import { stripe } from "@/lib/direct/stripe";

/**
 * Retrieves the NextAuth session and returns the session user.
 * If no session, redirects to /sign-in.
 */
export const onCurrentUser = async () => {
	const session = await getServerSession(authOptions);
	// If using a custom authOptions, do: const session = await getServerSession(authOptions);
	if (!session?.user) {
		return redirect("/sign-in");
	}
	return session.user;
};

/**
 * Example function to onboard a user.
 * Attempts to find them in your DB by a unique ID you store,
 * or creates them if missing.
 */
export const onBoardUser = async () => {
	const sessionUser = await onCurrentUser();
	const userEmail = sessionUser.email ?? "";
	const name = sessionUser.name ?? "";
	// Attempt to split name into first and last (fallbacks if only one part).
	const [firstName, ...rest] = name.split(" ");
	const lastName = rest.join(" ") || "User";

	try {
		// Try to find user in the DB by an ID you store.
		// If you store a custom ID in user.id, handle that. If not,
		// you may only have an email to look up the user.
		const found = await findUser(userEmail);

		if (found) {
			// Example logic for refreshing tokens if integratio ns exist.
			if (found.integrations.length > 0) {
				const expiresAt = found.integrations[0].expiresAt;
				if (expiresAt) {
					const timeLeft = expiresAt.getTime() - new Date().getTime();
					const daysLeft = Math.round(timeLeft / (1000 * 3600 * 24));

					if (daysLeft < 5) {
						console.log("Refresh token logic triggered");
						const refreshed = await refreshToken(
							found.integrations[0].token
						);
						const expireDate = new Date();
						expireDate.setDate(expireDate.getDate() + 60);

						const updated = await updateIntegration(
							refreshed.access_token,
							expireDate,
							found.integrations[0].id
						);
						if (!updated) {
							console.log("Update token failed");
						}
					}
				}
			}
			// Return partial user info
			return {
				status: 200,
				data: {
					firstname: found.firstname,
					lastname: found.lastname,
				},
			};
		}

		// If not found, create the user in DB.
		const created = await createUser(
			// If you store a user ID from NextAuth, pass it here.
			// If not, you might just store the email or some other unique field.
			userEmail, // Some unique ID or sub from session?
			firstName,
			lastName,
			userEmail
		);
		return { status: 201, data: created };
	} catch (error) {
		console.log(error);
		return { status: 500 };
	}
};

/**
 * Retrieves profile info for the current session user, if found in DB.
 */
export const onUserInfo = async () => {
	const sessionUser = await onCurrentUser();
	try {
		// If you store the user by email in DB, use sessionUser.email
		const profile = await findUser(sessionUser.email ?? "");
		if (profile) {
			return { status: 200, data: profile };
		}
		return { status: 404 };
	} catch (error) {
		console.log(error);
		return { status: 500 };
	}
};

/**
 * Example subscription logic triggered after a Stripe checkout session completes.
 */
export const onSubscribe = async (session_id: string) => {
	const sessionUser = await onCurrentUser();
	try {
		const session = await stripe.checkout.sessions.retrieve(session_id);
		if (session) {
			// In your queries file, you'd identify the user by sessionUser.email
			// or some unique ID you store to link them in the DB
			const subscribed = await updateSubscription(
				sessionUser.email ?? "",
				{
					customerId: session.customer as string,
					plan: "PRO",
				}
			);
			if (subscribed) return { status: 200 };
			return { status: 401 };
		}
		return { status: 404 };
	} catch (error) {
		console.log(error);
		return { status: 500 };
	}
};
