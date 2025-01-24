// app/api/get-access-token/route.ts

import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import querystring from "querystring";

export async function POST(req: NextRequest) {
	try {
		const tokenUrl = process.env.OAUTH2_TOKEN_URL;
		const clientId = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID;
		const clientSecret = process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET;
		const scopes = process.env.OAUTH2_SCOPES;

		if (!tokenUrl || !clientId || !clientSecret || !scopes) {
			return NextResponse.json(
				{ error: "Missing required environment variables" },
				{ status: 500 }
			);
		}

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

		const { access_token } = response.data;

		return NextResponse.json({ access_token }, { status: 200 });
	} catch (error: any) {
		console.error(
			"Error fetching access token:",
			error.response?.data || error.message
		);
		return NextResponse.json(
			{ error: "Error fetching access token" },
			{ status: 500 }
		);
	}
}
