import * as admin from "firebase-admin";
import axios, { AxiosResponse } from "axios";
import { serviceAccount } from "@/config/firebase/serviceAccount";
import { NextRequest, NextResponse } from "next/server";

// Environment Variables
const clientId = process.env.PRINTFUL_CLIENT_ID_MERCHANDISE as string;
const clientSecret = process.env.PRINTFUL_SECRET_KEY_MERCHANDISE as string;
const redirectUrl = `${process.env.NEXT_PUBLIC_URL}/merchandise/settings`;

// Initialize Firebase Admin SDK
const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		})
	: admin.app();

// Type Definitions
interface PrintfulTokenData {
	access_token: string;
	expires_at: number;
	token_type: string;
	refresh_token: string;
}

// Helper Function
const createAccessCode = async (
	printfulTokenData: PrintfulTokenData,
	firestoreAccess: string
): Promise<void> => {
	await app
		.firestore()
		.collection("users")
		.doc(firestoreAccess)
		.collection("printful")
		.doc("accessValues")
		.set({
			access_token: printfulTokenData.access_token,
			expires_at: printfulTokenData.expires_at,
			token_type: printfulTokenData.token_type,
			refresh_token: printfulTokenData.refresh_token,
		});

	console.log(
		`SUCCESS: Printful access token ${printfulTokenData.access_token} has been added to the DB`
	);
};

// API Handler
export async function GET(req: NextRequest): Promise<NextResponse> {
	const firestoreAccess = req.nextUrl.searchParams.get("state") || "";
	const printfulAccess = req.nextUrl.searchParams.get("code") || "";

	if (!firestoreAccess || !printfulAccess) {
		return NextResponse.json(
			{
				error: "Missing required query parameters: state or code.",
			},
			{ status: 400 }
		);
	}

	try {
		const response: AxiosResponse<PrintfulTokenData> = await axios.post(
			"https://www.printful.com/oauth/token",
			{
				grant_type: "access_token",
				client_id: clientId,
				client_secret: clientSecret,
				code: printfulAccess,
			}
		);

		const printfulTokenData = response.data;
		console.log(printfulTokenData);

		await createAccessCode(printfulTokenData, firestoreAccess);
		return NextResponse.redirect(redirectUrl, 307);
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error("Error fetching Printful token:", err.message);
			return NextResponse.json(
				{ error: `Error: ${err.message}` },
				{ status: 400 }
			);
		} else {
			console.error("Unknown error occurred");
			return NextResponse.json(
				{ error: "Unknown error occurred" },
				{ status: 400 }
			);
		}
	}
}

export async function POST() {
	return NextResponse.json(
		{ error: "POST method not allowed for this route." },
		{ status: 405 }
	);
}

export const config = {
	runtime: "edge",
};
