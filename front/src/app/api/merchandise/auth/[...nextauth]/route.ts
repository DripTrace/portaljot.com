// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import EmailProvider from "next-auth/providers/email";
import nodemailer from "nodemailer";
import { html, text } from "@/app/api/merchandise/emails/email-create/route";
import { collection, query, getDocs, where } from "firebase/firestore";
import { adapterInstance } from "@/lib/merchandise/database/firebaseFirestore";
import { db } from "@/lib/merchandise/database/firebaseStorage";
import { verifyPassword } from "@/lib/merchandise/password-auth";
import ac from "@/utils/merchandise/services/accesscontrol";
import { NextRequest, NextResponse } from "next/server";

const THIRTY_DAYS = 30 * 24 * 60 * 60;
const THIRTY_MINUTES = 30 * 60;

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	session: {
		strategy: "jwt",
		maxAge: THIRTY_DAYS,
		updateAge: THIRTY_MINUTES,
	},
	adapter: adapterInstance,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					throw new Error("Email and password are required.");
				}

				const AuthenticationQuery = query(
					collection(db, "users"),
					where("email", "==", credentials.email)
				);

				const authSnapshot = await getDocs(AuthenticationQuery);
				const userCollection: Record<string, any> = {};
				authSnapshot.forEach((doc) => {
					const userData = doc.data();
					userData["_id"] = doc.id;
					userCollection[doc.id] = userData;
				});

				const user = Object.values(userCollection)[0];

				if (!user || !user.password) {
					throw new Error("Invalid credentials.");
				}

				const isValid = await verifyPassword(
					credentials.password,
					user.password
				);

				if (!isValid) {
					throw new Error("Could not log you in!");
				}

				return {
					id: user.obinsunUuid,
					name: `${user.firstname} ${user.lastname}`,
					email: user.email,
				};
			},
		}),
		EmailProvider({
			server: {
				host: process.env.SMTP_HOST,
				port: Number(process.env.SMTP_PORT),
				auth: {
					user: process.env.SMTP_USER,
					pass: process.env.SMTP_PASSWORD,
				},
			},
			from: process.env.SMTP_FROM,
			async sendVerificationRequest({
				identifier: email,
				url,
				provider: { server, from },
			}) {
				const { host } = new URL(url);
				const transporter = nodemailer.createTransport(server);
				await transporter.sendMail({
					to: email,
					from,
					subject: `Sign in to ${host}`,
					text: text({ url, host }),
					html: html({ url, host, email }),
				});
			},
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID!,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		async jwt({ token }) {
			const userQuery = query(
				collection(db, "users"),
				where("email", "==", token.email)
			);

			const userSnapshot = await getDocs(userQuery);
			const userCollection: Record<string, any> = {};

			userSnapshot.forEach((doc) => {
				const userData = doc.data();
				userData["_id"] = doc.id;
				userCollection[doc.id] = userData;
			});

			const user = Object.values(userCollection)[0];
			if (user) {
				token = { ...token, ...user };
			}

			return token;
		},
		async session({ session, token }) {
			session.user = { ...session.user, ...token };
			session.user.permissions =
				token.role in ac.getGrants()
					? { [token.role]: ac.getGrants()[token.role] }
					: {};
			return session;
		},
		async redirect({ url, baseUrl }) {
			const customBaseUrl = `${process.env.NEXT_PUBLIC_URL}/merchandise`;
			const customApiUrl = `${process.env.NEXT_PUBLIC_URL}/api/merchandise/`;

			if (url.startsWith(customBaseUrl) || url.startsWith(customApiUrl)) {
				return url;
			}

			if (url.startsWith("/merchandise")) {
				return `${customBaseUrl}${url.slice("/merchandise".length)}`;
			} else if (url.startsWith("/api/merchandise")) {
				return `${customApiUrl}${url.slice("/api/merchandise".length)}`;
			}

			return customBaseUrl;
		},
	},
	events: {},
};

export async function POST(req: NextRequest): Promise<NextResponse> {
	return NextAuth(req, NextResponse.json.bind(NextResponse), authOptions);
}
