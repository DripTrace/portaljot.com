// app/api/auth/route.ts

import { NextRequest, NextResponse } from "next/server";
import { SDK } from "@ringcentral/sdk";
import crypto from "crypto";

// Function to generate a code verifier for PKCE
function generateCodeVerifier(): string {
	return crypto
		.randomBytes(32)
		.toString("base64")
		.replace(/\+/g, "-")
		.replace(/\//g, "_")
		.replace(/=/g, "");
}

// Function to generate a code challenge from the verifier
function generateCodeChallenge(verifier: string): string {
	const base64Hash = crypto
		.createHash("sha256")
		.update(verifier)
		.digest("base64");
	return base64Hash.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export async function GET(req: NextRequest) {
	const url = new URL(req.url);
	const code = url.searchParams.get("code");
	const state = url.searchParams.get("state");

	if (code && state) {
		try {
			const storedCodeVerifier = state;

			const rcsdk = new SDK({
				server: process.env.NEXT_PUBLIC_RC_SERVER_URL!,
				clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!,
				clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET!,
				redirectUri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
			});

			const platform = rcsdk.platform();

			await platform.login({
				code: code,
				redirect_uri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
				code_verifier: storedCodeVerifier,
			});

			const tokenData = await platform.auth().data();

			console.log("Authentication successful, redirecting...");

			return NextResponse.redirect(
				new URL(
					`/llpmg/sip?tokenData=${encodeURIComponent(JSON.stringify(tokenData))}`,
					req.url
				)
			);
		} catch (error: any) {
			console.error("Failed to complete authentication:", error);
			return NextResponse.json(
				{
					message: "Failed to complete authentication",
					error: error.message,
				},
				{ status: 500 }
			);
		}
	} else {
		try {
			const redirectUri = process.env.NEXT_PUBLIC_RC_REDIRECT_URI!;

			if (
				!redirectUri ||
				(!redirectUri.startsWith("http://") &&
					!redirectUri.startsWith("https://"))
			) {
				throw new Error(`Invalid redirect URI: ${redirectUri}`);
			}

			const clientId = process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!;
			const codeVerifier = generateCodeVerifier();
			const codeChallenge = generateCodeChallenge(codeVerifier);

			const loginUrl = new URL("https://login.ringcentral.com/");
			loginUrl.searchParams.append("responseType", "code");
			loginUrl.searchParams.append("clientId", clientId);
			loginUrl.searchParams.append("brandId", "1210");
			loginUrl.searchParams.append("state", codeVerifier);
			loginUrl.searchParams.append("localeId", "en_US");
			loginUrl.searchParams.append("display", "page");
			loginUrl.searchParams.append("prompt", "login sso");
			loginUrl.searchParams.append("appUrlScheme", redirectUri);
			loginUrl.searchParams.append("code_challenge", codeChallenge);
			loginUrl.searchParams.append("code_challenge_method", "S256");

			console.log("Generated login URL:", loginUrl.toString());

			return NextResponse.json(
				{
					loginUrl: loginUrl.toString(),
					codeVerifier,
				},
				{ status: 200 }
			);
		} catch (error: any) {
			console.error("Error generating login URL:", error);
			return NextResponse.json(
				{
					error: "Failed to generate login URL",
					details: error.message,
				},
				{ status: 500 }
			);
		}
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { code, state } = body;

		if (!code) {
			return NextResponse.json(
				{ message: "Authorization code is missing" },
				{ status: 400 }
			);
		}

		const rcsdk = new SDK({
			server: process.env.NEXT_PUBLIC_RC_SERVER_URL!,
			clientId: process.env.NEXT_PUBLIC_RC_APP_CLIENT_ID!,
			clientSecret: process.env.NEXT_PUBLIC_RC_APP_CLIENT_SECRET!,
			redirectUri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
		});

		const platform = rcsdk.platform();

		console.log("Attempting to login with code:", code);

		await platform.login({
			code,
			redirect_uri: process.env.NEXT_PUBLIC_RC_REDIRECT_URI!,
			code_verifier: state,
		});

		const tokenData = await platform.auth().data();

		console.log("Authentication successful, returning token data.");

		return NextResponse.json({ tokenData }, { status: 200 });
	} catch (error: any) {
		console.error("Failed to exchange code:", error);
		return NextResponse.json(
			{
				message: "Failed to exchange code",
				error: error.message,
			},
			{ status: 500 }
		);
	}
}
