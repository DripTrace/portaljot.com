// lib/auth/google.ts
import { google } from "googleapis";

interface ServiceAccountCredentials {
	type: "service_account";
	project_id: string;
	private_key_id: string;
	private_key: string;
	client_email: string;
	client_id: string;
	auth_uri: string;
	token_uri: string;
	auth_provider_x509_cert_url: string;
	client_x509_cert_url: string;
	universe_domain: string;
}

const credentials: ServiceAccountCredentials = {
	type: process.env.GOOGLE_SERVICE_ACCOUNT_TYPE as "service_account",
	project_id: process.env.GOOGLE_PROJECT_ID!,
	private_key_id: process.env.GOOGLE_PRIVATE_KEY_ID!,
	private_key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
	client_email: process.env.GOOGLE_CLIENT_EMAIL!,
	client_id: process.env.GOOGLE_CLIENT_ID!,
	auth_uri: process.env.GOOGLE_AUTH_URI!,
	token_uri: process.env.GOOGLE_TOKEN_URI!,
	auth_provider_x509_cert_url:
		process.env.GOOGLE_AUTH_PROVIDER_X509_CERT_URL!,
	// client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${process.env.GOOGLE_CLIENT_EMAIL}`,
	client_x509_cert_url: process.env.GOOGLE_CLIENT_X509_CERT_URL!,
	universe_domain: process.env.GOOGLE_UNIVERSE_DOMAIN!,
};

export async function getGoogleAuthToken() {
	const auth = new google.auth.GoogleAuth({
		credentials,
		scopes: ["https://www.googleapis.com/auth/cloud-platform"],
	});

	const client = await auth.getClient();
	const token = await client.getAccessToken();
	return token.token;
}
