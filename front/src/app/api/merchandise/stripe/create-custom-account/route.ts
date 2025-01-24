import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MERCHANDISE as string, {
	apiVersion: "2024-12-18.acacia",
});

export const config = {
	runtime: "edge",
};

interface FormData {
	mcc: string;
	url: string;
	firstName: string;
	lastName: string;
	dob: string;
	line1: string;
	postalCode: string;
	city: string;
	state: string;
	email: string;
	phone: string;
	ssnLast4: string;
}

interface RequestBody {
	firebaseID: string;
	date: number;
	ip: string;
	formData: FormData;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		const { firebaseID, date, ip, formData }: RequestBody =
			await req.json();

		if (!firebaseID || !date || !ip || !formData) {
			return NextResponse.json(
				{ error: "Missing required fields" },
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
		} = formData;

		const datePattern = /(\d{4})-(\d{1,2})-(\d{1,2})/;
		const birthDate = datePattern.exec(dob);

		if (!birthDate) {
			return NextResponse.json(
				{ error: "Invalid date format" },
				{ status: 400 }
			);
		}

		const [, birthYear, birthMonth, birthDay] = birthDate;

		const account = await stripe.accounts.create({
			country: "US",
			type: "custom",
			business_profile: {
				mcc: mcc,
				url: `https://${url}.com`,
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
					day: Number(birthDay),
					month: Number(birthMonth),
					year: Number(birthYear),
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
			tos_acceptance: { date, ip },
			metadata: {
				firebaseID,
			},
		});

		return NextResponse.json(account, { status: 200 });
	} catch (error) {
		console.error("Error creating Stripe account:", error);
		const errorMessage =
			error instanceof Error ? error.message : "Unknown error occurred";

		return NextResponse.json(
			{ error: `Internal Server Error: ${errorMessage}` },
			{ status: 500 }
		);
	}
}

export async function GET(): Promise<NextResponse> {
	return NextResponse.json(
		{ error: "GET method not allowed for this route." },
		{ status: 405 }
	);
}
