import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { InitialAccount } from "@/types/merchandise/interfaces/objects/obinsun-objects";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export async function POST(req: NextRequest) {
	try {
		const body: InitialAccount = await req.json();
		const { transactId, change, formData, date, ip, cc, stripeId, object } =
			body;

		if (
			!transactId ||
			!change ||
			!date ||
			!ip ||
			!cc ||
			!stripeId ||
			!formData
		) {
			return NextResponse.json(
				{ error: "Missing required fields in the request." },
				{ status: 400 }
			);
		}

		const {
			mcc,
			url,
			firstName,
			lastName,
			dob,
			line1,
			postalCode,
			city,
			state,
			email,
			phone,
			ssnLast4,
			currency,
			routing_number,
			account_number,
			number,
			exp_month_year,
			cvc,
			bankName,
			cardName,
		} = formData;

		switch (change) {
			case "create-custom-account":
				if (
					!firstName ||
					!lastName ||
					!dob ||
					!line1 ||
					!city ||
					!state ||
					!postalCode ||
					!email ||
					!phone
				) {
					return NextResponse.json(
						{
							error: "Missing required fields for custom account creation.",
						},
						{ status: 400 }
					);
				}

				const [birthYear, birthMonth, birthDay] = dob
					.split("-")
					.map(Number);

				try {
					await stripe.accounts.create({
						country: cc,
						type: "custom",
						business_profile: {
							mcc,
							url: url ? `https://${url}.com` : undefined,
						},
						business_type: "individual",
						capabilities: {
							card_payments: { requested: true },
							transfers: { requested: true },
						},
						individual: {
							first_name: firstName,
							last_name: lastName,
							dob: {
								day: birthDay,
								month: birthMonth,
								year: birthYear,
							},
							address: {
								line1,
								city,
								state,
								postal_code: postalCode,
							},
							email,
							phone,
							ssn_last_4: ssnLast4,
						},
						tos_acceptance: {
							date: Math.floor(date / 1000),
							ip,
						},
						metadata: {
							transactId,
							change,
						},
					});
					return NextResponse.json(
						{ message: "Custom account created successfully" },
						{ status: 200 }
					);
				} catch (error) {
					const stripeError = error as Stripe.StripeRawError;
					return NextResponse.json(
						{
							error: `Error creating custom account: ${stripeError.message}`,
						},
						{ status: 500 }
					);
				}

			case "create-external-account":
				if (object === "bank_account") {
					// Handle bank account creation logic here
				} else if (object === "card") {
					if (!currency || !number || !exp_month_year || !cvc) {
						return NextResponse.json(
							{ error: "Missing required card details." },
							{ status: 400 }
						);
					}

					const [expYear, expMonth] = exp_month_year
						.split("-")
						.map(Number);

					try {
						const cardToken = await stripe.tokens.create({
							card: {
								number: number,
								exp_month: expMonth.toString(),
								exp_year: expYear.toString(),
								cvc: cvc,
							},
						} as Stripe.TokenCreateParams);

						await stripe.accounts.createExternalAccount(stripeId, {
							external_account: cardToken.id,
							metadata: { transactId, cardName: cardName || "" },
						});

						return NextResponse.json(
							{ message: "Card added successfully" },
							{ status: 200 }
						);
					} catch (error) {
						const stripeError = error as Stripe.StripeRawError;
						return NextResponse.json(
							{
								error: `Error adding card: ${stripeError.message}`,
							},
							{ status: 500 }
						);
					}
				} else {
					return NextResponse.json(
						{
							error: "Invalid object type for external account creation.",
						},
						{ status: 400 }
					);
				}
				break;

			default:
				return NextResponse.json(
					{ error: `Unhandled action ${change}` },
					{ status: 400 }
				);
		}
	} catch (error) {
		console.error("Error in POST handler:", error);
		return NextResponse.json(
			{
				error: "An unknown error occurred",
				details: error instanceof Error ? error.message : String(error),
			},
			{ status: 500 }
		);
	}
}

export const config = {
	runtime: "edge",
};
