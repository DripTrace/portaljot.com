import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function POST(req: NextRequest): Promise<NextResponse> {
	try {
		// Environment variables for OAuth2 credentials and token URL
		const tokenUrl = process.env.OAUTH2_TOKEN_URL!;
		const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID!;
		const clientSecret = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET!;
		const scopes = process.env.OAUTH2_SCOPES!;

		// Request an access token from the OAuth2 provider
		const response = await axios.post(
			tokenUrl,
			querystring.stringify({
				client_id: clientId,
				client_secret: clientSecret,
				scope: scopes,
				grant_type: "client_credentials",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
				},
			}
		);

		// Extract the access token from the response
		const { access_token } = response.data;

		// Return the access token in the response
		return NextResponse.json({ access_token }, { status: 200 });
	} catch (error) {
		// Log error details for debugging
		console.error("Error fetching access token:", error);

		// Return an error response
		return NextResponse.json(
			{ error: "Error fetching access token" },
			{ status: 500 }
		);
	}
}
